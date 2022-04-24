import { Button, Switch, Dropdown } from 'antd';
import { Dropdown as DropdownIcon } from 'icons';
import { Table } from 'components';
import './UsersGroups.styles.scss';

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
            <Button>Delete</Button>
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

export const UsersGroups = () => {
  return (
    <div className="users-groups">
      <Table columns={columns} data={data} />
    </div>
  );
};
