import { Button, Switch } from 'antd';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaymentGateways } from 'store';
import { AddPaymentGateway, EditPaymentGateway } from './sections';

const columns = [
  {
    title: 'Payment Gateway',
    dataIndex: 'name',
    key: 'name',
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
    render: (value) => <Switch defaultChecked={value} disabled={true} />,
  },
];

// let data = [];
// for (let i = 0; i < 25; i++) {
//   data.push({
//     key: i,
//     name: 'PayPal',
//     apiKey: '123456789',
//     status: i % 2 === 0 ? true : false,
//   });
// }

const PaymentGateways = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPaymentGateways());
  }, []);

  const { paymentGateways, loading } = useSelector(
    (state) => state.paymentGateways
  );

  // Check for permissions Start
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Settings',
    modules: userModules,
  });
  // Check for permissions End

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    if (paymentGateways.length) {
      const dataToSet = paymentGateways.map((pg) => {
        return {
          ...pg,
          key: pg?.id,
        };
      });
      setData(dataToSet);
    }
  }, [paymentGateways]);

  return (
    <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <AddPaymentGateway show={addModalShow} setShow={setAddModalShow} />
      <EditPaymentGateway
        show={editModalShow}
        setShow={setEditModalShow}
        editValue={editValue}
      />
      <Table
        columns={columns}
        data={data}
        permissions={permissions}
        loading={loading}
        fieldToFilter="name"
        btnData={{
          text: 'Add Payment Gateway',
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

export default PaymentGateways;
