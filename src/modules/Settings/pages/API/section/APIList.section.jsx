import { Button, Switch } from 'antd';
import { Table } from 'components';
import { useState } from 'react';
// import { AddPaymentGateway, EditPaymentGateway } from './sections';

const columns = [
  {
    title: 'Payment Gateway',
    dataIndex: 'gatewayName',
    key: 'gatewayName',
    width: '33%',
  },
  {
    title: 'API Key',
    dataIndex: 'apiKey',
    key: 'apiKey',
    width: '33%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Switch defaultChecked={value} onChange={() => {}} />,
  },
];

let data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    key: i,
    gatewayName: 'PayPal',
    apiKey: '123456789',
    status: i % 2 === 0 ? true : false,
  });
}

export const APIList = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  return (
    <div className="mt-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      {/* <AddPaymentGateway show={addModalShow} setShow={setAddModalShow} />
      <EditPaymentGateway
        show={editModalShow}
        setShow={setEditModalShow}
        editValue={editValue}
      /> */}
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
          text: 'Add API Key',
          onClick: () => setAddModalShow(true),
        }}
        // loading={loading}
        editAction={(record) => (
          <Button
            onClick={() => {
              setEditValue(record);
              setEditModalShow(true);
            }}
          >
            Edit
          </Button>
        )}
      />
    </div>
  );
};
