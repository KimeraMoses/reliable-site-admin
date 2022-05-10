import { Button } from 'antd';
import * as Yup from 'yup';
import { Modal, Table } from 'components';
import './UsersList.styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'store';
import { checkModule } from 'lib/checkModule';
import { EditUser } from '../sections';

const initialAddValues = {
  username: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  status: true,
  ipAddress: '',
  groupID: '',
};

const addValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Please use 8 or more characters with a mix of letters, numbers & symbols'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  status: Yup.bool().required('Status is required'),
  ipAddress: Yup.string().required('IP Address is required'),
  groupID: Yup.string().required('Group is required'),
});

export const UsersList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { t } = useTranslation('/Users/ns');

  const navigate = useNavigate();

  const addFields = [
    {
      type: 'input',
      name: 'username',
      placeholder: 'Paul.Elliott',
      title: t('username'),
    },
    {
      type: 'input',
      name: 'fullName',
      placeholder: 'Paul.Elliott',
      title: t('fullName'),
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Paul.Elliott@Fakemail.com',
      title: t('email'),
    },
    {
      type: 'password',
      name: 'password',
      placeholder: '*******',
      title: t('password'),
    },
    {
      type: 'password',
      name: 'confirmPassword',
      placeholder: '*******',
      title: t('confirmPassword'),
    },
    {
      type: 'switch',
      name: 'status',
      title: t('status'),
    },
    {
      type: 'input',
      name: 'ipAddress',
      placeholder: '253.205.121.39',
      title: t('ipAddress'),
    },
    {
      type: 'select',
      options: [
        { label: 'Group1', value: 'group1' },
        { label: 'Group2', value: 'group2' },
      ],
      name: 'groupID',
      placeholder: 'Select Admin Group...',
      title: t('adminGroup'),
    },
  ];

  const columns = [
    {
      title: t('adminName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('companyName'),
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: t('createDate'),
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
  ];

  // Users Logic Start
  const { loading, users } = useSelector((state) => state?.users);
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  const [tableUsers, setTableUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getUsers());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (users.length) {
      let usersData = [];
      users.forEach((user) => {
        usersData.push({
          key: user?.id,
          id: user?.id,
          name: user?.fullName,
          email: user?.email,
          ...user,
          // TODO: Check with back-end dev for these two fields
          companyName: user?.companyName ? user?.companyName : 'N/A',
          createdAt: user?.createdAt ? user?.createdAt : 'N/A',
        });
      });
      setTableUsers(usersData);
    }
  }, [users]);
  // Users Logic End

  // Edit User Logic
  const [editUser, setEditUser] = useState(null);

  return (
    <div className="users">
      <div className="users__inner">
        <div className="users-list">
          <Modal
            show={showAdd}
            setShow={setShowAdd}
            heading={t('addNewUser')}
            submitText={t('addAdminUser')}
            initialValues={initialAddValues}
            validationSchema={addValidationSchema}
            fields={addFields}
            handleSubmit={(values) => {
              console.log(values);
            }}
          />
          <EditUser
            show={editModal}
            setShow={setEditModal}
            t={t}
            user={editUser}
          />
          <Table
            columns={columns}
            data={tableUsers}
            permissions={permissions}
            fieldToFilter="name"
            btnData={{
              text: t('addAdminUser'),
              onClick: () => setShowAdd(true),
            }}
            loading={loading}
            viewAction={(record) => {
              return (
                <>
                  {' '}
                  {/* TODO: Replace with UID */}
                  <Button
                    onClick={() =>
                      navigate(
                        `/admin/dashboard/users/list/admin-details/${record?.id}`
                      )
                    }
                  >
                    {t('view')}
                  </Button>
                </>
              );
            }}
            editAction={(record) => (
              <Button
                onClick={() => {
                  console.log(record);
                  setEditUser(record);
                  setEditModal(true);
                }}
              >
                Edit
              </Button>
            )}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};
