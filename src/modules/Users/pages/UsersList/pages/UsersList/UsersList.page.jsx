import { Button, Dropdown } from 'antd';
import * as Yup from 'yup';
import { Dropdown as DropdownIcon } from 'icons';
import { Modal, Table } from 'components';
import './UsersList.styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      email: `Paul.Elliot${i}@Fakemail.com`,
      companyName: `Mind2Matter ${i}`,
      createdAt: '05/02/2022',
    });
  }

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
    {
      title: t('actions'),
      key: 'actions',
      render: () => (
        <Dropdown
          overlayClassName="custom-table__table-dropdown-overlay"
          className="custom-table__table-dropdown"
          destroyPopupOnHide
          placement="bottomRight"
          overlay={
            <>
              {/* TODO: Replace with UID */}
              <Button
                onClick={() =>
                  navigate('/admin/dashboard/users/list/admin-details/123')
                }
              >
                {t('view')}
              </Button>
              <Button>{t('edit')}</Button>
            </>
          }
          trigger={['click']}
        >
          <Button type="primary" className="custom-table__table-dropdown-btn">
            <div>{t('actions')}</div>
            <div>
              <DropdownIcon />
            </div>
          </Button>
        </Dropdown>
      ),
    },
  ];

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
          <Modal show={editModal} setShow={setEditModal} heading="Edit Group" />
          <Table
            columns={columns}
            data={data}
            fieldToFilter="name"
            btnData={{
              text: t('addAdminUser'),
              onClick: () => setShowAdd(true),
            }}
          />
        </div>
      </div>
    </div>
  );
};
