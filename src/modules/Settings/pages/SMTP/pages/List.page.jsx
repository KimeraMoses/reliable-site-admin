import { Button } from 'antd';
import { Table } from 'components';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
  },
  {
    title: 'Port',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: 'Protocol',
    dataIndex: 'protocol',
    key: 'protocol',
    width: '40%',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

let data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    id: i,
    key: i,
    host: `Host Name ${i}`,
    port: `30${i}`,
    protocol: 'HTTP',
    createdAt: 'Sunday, March 26th, 2022 at 06:30 PM',
  });
}

export const List = () => {
  const navigate = useNavigate();
  return (
    <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <Table
        columns={columns}
        data={data}
        permissions={{
          View: true,
          Update: true,
          Remove: true,
          Create: true,
          Search: true,
        }}
        fieldToFilter="name"
        btnData={{
          text: 'Add New Configuration',
          onClick: () => {
            navigate('/admin/dashboard/settings/smtp/configuration/add');
          },
        }}
        // loading={loading}
        editAction={(record) => (
          <Button
            onClick={() => {
              navigate(`/admin/dashboard/settings/smtp/edit/${record.id}`);
            }}
          >
            Edit
          </Button>
        )}
      />
    </div>
  );
};
