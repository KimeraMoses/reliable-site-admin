import { Button } from 'antd';
import { Table } from 'components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from './sections';

const columns = [
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    width: '15%',
  },
  {
    title: 'Configuration',
    dataIndex: 'config',
    key: 'config',
    width: '70%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span>
        {status ? (
          <span className="text-[#0BB783] px-[8px] py-[4px] bg-[#1C3238] rounded-[4px]">
            Enabled
          </span>
        ) : (
          <span className="text-[#F64E60] px-[8px] py-[4px] bg-[#3A2434] rounded-[4px]">
            Disabled
          </span>
        )}
      </span>
    ),
  },
];

let data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    id: i,
    key: i,
    subject: `Email Subject ${i}`,
    config: 'SMTP Configuration - Host Name',
    status: i % 2 === 0 ? true : false,
  });
}

export const List = () => {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <Delete show={show} setShow={setShow} record={record} />
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
          text: 'Add New Template',
          onClick: () => {
            navigate('/admin/dashboard/settings/email-templates/template/add');
          },
        }}
        // loading={loading}
        editAction={(record) => (
          <Button
            onClick={() => {
              navigate(
                `/admin/dashboard/settings/email-templates/edit/${record.id}`
              );
            }}
          >
            Edit
          </Button>
        )}
        deleteAction={(record) => {
          return (
            <Button
              onClick={() => {
                setRecord(record);
                setShow(true);
              }}
            >
              Delete
            </Button>
          );
        }}
      />
    </div>
  );
};
