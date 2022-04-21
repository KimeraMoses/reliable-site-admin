import { DashboardLayout } from 'layout';
import { Table } from 'components';
import { Select } from 'antd';
import './Users.styles.scss';
import { useState } from 'react';
// import './Home.styles.scss';

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

// Columns for table
const columns = [
  {
    title: 'ORDER ID',
    dataIndex: 'uid',
  },
  {
    title: 'CLIENT',
    dataIndex: 'client',
    render: (text, record) => (
      <div className="user__client">
        <img src={record?.client_img} /> {text}
      </div>
    ),
    width: 170,
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    render: (text) => (
      <div
        className={`user__status
        ${text === 'pending' ? 'user__status-pending' : ''}
        ${text === 'completed' ? 'user__status-completed' : ''}
         ${text === 'cancelled' ? 'user__status-cancelled' : ''}
        `}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'TOTAL',
    dataIndex: 'total',
  },
  {
    title: 'DATE ADDED',
    dataIndex: 'date_added',
  },
  {
    title: 'DATE MODIFIED',
    dataIndex: 'date_modified',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (text) => (
      <Select
        defaultValue={text}
        style={{ width: 120 }}
        onChange={handleChange}
        className="user__select"
        dropdownClassName="user__dropdown"
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    ),
    // width: 150,
  },
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    client_img: '/img/google-icon.png',
    client: `Paul Elliott ${i}`,
    status: 'cancelled',
    total: '200.00USD',
    date_added: `05/02/2022`,
    date_modified: '05/02/2022',
    action: 'Actions',
  });
}

function Users() {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-width: 1400px)',
  // });

  return (
    <DashboardLayout>
      <div className="p-4 md:px-6 dashboard">
        {/* SHOW TABLE HERE */}
        {/* <Table /> */}
        <Table columns={columns} data={data} />
      </div>
    </DashboardLayout>
  );
}
export default Users;
