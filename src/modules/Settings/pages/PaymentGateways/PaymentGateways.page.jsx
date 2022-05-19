import { Button, Switch } from 'antd';
import { Table } from 'components';

const columns = [
  {
    title: 'Payment Gateway',
    dataIndex: 'payment_gateway',
    key: 'payment_gateway',
    width: '33%',
  },
  {
    title: 'API Key',
    dataIndex: 'api_key',
    key: 'api_key',
    width: '33%',
  },
  {
    title: 'Toggle',
    dataIndex: 'toggle',
    key: 'toggle',
    render: (value) => <Switch defaultChecked={value} onChange={() => {}} />,
  },
];

let data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    key: i,
    payment_gateway: 'PayPal',
    api_key: '123456789',
    toggle: i % 2 === 0 ? true : false,
  });
}

const PaymentGateways = () => {
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
          text: 'Add Payment Gateway',
          onClick: () => {},
        }}
        // loading={loading}
        // viewAction={(record) => {
        //   return <></>;
        // }}
        editAction={(record) => (
          <Button
            onClick={() => {
              console.log(record);
            }}
          >
            Edit
          </Button>
        )}
      />
    </div>
  );
};

export default PaymentGateways;
