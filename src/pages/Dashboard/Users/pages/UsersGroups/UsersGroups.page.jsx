import { Button, Switch, Dropdown } from 'antd';
import * as Yup from 'yup';
import { Dropdown as DropdownIcon } from 'icons';
import { Modal, Table } from 'components';
import './UsersGroups.styles.scss';
import { useState } from 'react';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    numberOfUsers: 32,
    status: 'Active',
    createdAt: '2019-01-01',
  });
}

const initialValues = {
  name: '',
  status: false,
  makeDefault: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
  status: Yup.boolean().required('This field is required!'),
  makeDefault: Yup.boolean().required('This field is required!'),
});

const addFields = [
  {
    type: 'input',
    name: 'name',
    placeholder: 'Group Name',
    title: 'Name',
  },
  {
    type: 'switch',
    name: 'status',
    title: 'Status',
  },
  {
    type: 'switch',
    name: 'makeDefault',
    title: 'Make Default Group',
  },
];

const add2Fields = [
  {
    type: 'crud',
    name: 'module1',
    title: 'Module 1',
  },
  {
    type: 'crud',
    name: 'module2',
    title: 'Module 2',
  },
  {
    type: 'crud',
    name: 'module3',
    title: 'Module 3',
  },
  {
    type: 'crud',
    name: 'module4',
    title: 'Module 4',
  },
];

export const UsersGroups = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [permissionsInit, setPermissionsInit] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(true);

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of Admin Users',
      dataIndex: 'numberOfUsers',
      key: 'numberOfUsers',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => {
        return <Switch defaultChecked />;
      },
    },
    {
      title: 'Created Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Dropdown
          overlayClassName="custom-table__table-dropdown-overlay"
          className="custom-table__table-dropdown"
          destroyPopupOnHide
          placement="bottomRight"
          overlay={
            <>
              <Button>Edit</Button>
              <Button onClick={() => setDeleteModal(true)}>Delete</Button>
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
    <div className="users-groups">
      <Modal
        show={showAdd}
        setShow={setShowAdd}
        heading="Add New Group"
        submitText="Configure Permission"
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={addFields}
        handleSubmit={(values) => {
          setPermissionsInit(values);
          setShowAdd(false);
          setShowPermissions(true);
        }}
      />
      <Modal
        show={showPermissions}
        setShow={setShowPermissions}
        heading="Configure Permissions"
        submitText="Create New Group"
        cancelButtonText="Back"
        handleCancel={() => {
          setShowPermissions(false);
          setShowAdd(true);
        }}
        initialValues={{
          ...permissionsInit,
          module1: { create: false, read: false, update: false, delete: false },
          module2: { create: false, read: false, update: false, delete: false },
          module3: { create: false, read: false, update: false, delete: false },
          module4: { create: false, read: false, update: false, delete: false },
        }}
        fields={add2Fields}
        handleSubmit={(values) => {
          console.log(values);
        }}
      />
      <Modal show={editModal} setShow={setEditModal} heading="Edit Group" />
      <Modal
        show={deleteModal}
        setShow={setDeleteModal}
        heading="Delete Group"
        customBody={
          <div>
            <p style={{ marginBottom: '32px' }}>
              Are you sure you wish to delete this group? Deleting this group
              will move all users to the default group.
            </p>
          </div>
        }
        fields={[]}
        validationSchema={Yup.object().shape({})}
        initialValues={{}}
        submitText="Delete Group"
        handleSubmit={(values) => {
          console.log('Submitting');
          console.log(values);
        }}
      />
      <Table
        columns={columns}
        data={data}
        fieldToFilter="name"
        btnData={{ text: 'Add New Group', onClick: () => setShowAdd(true) }}
      />
    </div>
  );
};
