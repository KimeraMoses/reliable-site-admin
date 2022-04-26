import { Button, Dropdown } from 'antd';
import * as Yup from 'yup';
import { Dropdown as DropdownIcon } from 'icons';
import { Modal, Table } from 'components';
import './UsersList.styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  status: Yup.bool().required('Status is required'),
  ipAddress: Yup.string().required('IP Address is required'),
  groupID: Yup.string().required('Group is required'),
});

const addFields = [
  {
    type: 'input',
    name: 'username',
    placeholder: 'Paul.Elliott',
    title: 'Username',
  },
  {
    type: 'input',
    name: 'fullName',
    placeholder: 'Paul.Elliott',
    title: 'Full Name',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'Paul.Elliott@Fakemail.com',
    title: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: '*******',
    title: 'Password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    placeholder: '*******',
    title: 'Confirm Password',
  },
  {
    type: 'switch',
    name: 'status',
    title: 'Status',
  },
  {
    type: 'input',
    name: 'ipAddress',
    placeholder: '253.205.121.39',
    title: 'Restrict Access To IP Address',
  },
  {
    type: 'select',
    options: [
      { label: 'Group1', value: 'group1' },
      { label: 'Group2', value: 'group2' },
    ],
    name: 'groupID',
    placeholder: 'Select Admin Group...',
    title: 'Admin Group',
  },
];

export const UsersList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [editModal, setEditModal] = useState(false);

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

  const columns = [
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Created Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Actions',
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
                View
              </Button>
              <Button>Edit</Button>
            </>
          }
          trigger={['click']}
        >
          <Button type="primary" className="custom-table__table-dropdown-btn">
            <div>Actions</div>
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
            heading="Add New User"
            submitText="Add New Admin User"
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
              text: 'Add New Admin User',
              onClick: () => setShowAdd(true),
            }}
          />
        </div>
      </div>
    </div>
  );
};
