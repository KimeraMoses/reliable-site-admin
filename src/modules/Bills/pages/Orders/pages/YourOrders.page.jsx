import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'components';
import { statusList } from 'lib';
import { checkModule } from 'lib/checkModule';
import { getOrders } from 'store';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AddOrder } from './sections/AddOrder.section';
import { getClients } from 'store';
import { getProducts } from 'store';
import { getOrderTemplates } from 'store';

export const YourOrders = () => {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const { t } = useTranslation('/Bills/ns');
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state?.orders);
  const { userModules } = useSelector((state) => state?.modules);
  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
      await dispatch(getOrderTemplates());
      await dispatch(getClients());
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  // Setting data properly
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { permissions } = checkModule({
    module: 'Orders',
    modules: userModules,
  });

  useEffect(() => {
    setData([]);
    if (orders?.length) {
      const dataToSet = orders?.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      setData(dataToSet);
    }
  }, [orders]);

  const columns = [
    {
      title: t('orderId'),
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: t('client'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName) => {
        // let name = "";
        // let userN = fullName?.split(" ");
        // if (userN?.length < 2) {
        //   name = userN?.[0]?.charAt(0);
        // } else {
        //   name = userN?.[0]?.charAt(0) + userN?.[1]?.charAt(0);
        // }
        // console.log(record);
        // const statusValue = statusList(record?.status);
        return (
          <div className="flex items-center gap-[12px]">
            {/* {record?.issueByImage ? (
              <img
                src={record?.userImagePath}
                alt="card"
                className="w-[32px] h-[20px] object-cover rounded-[4px]"
              />
            ) : (
              <div
                className={`bg-[${statusValue.bg}] px-[8px] py-[4px]  text-[${statusValue.text}] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center`}
              >
                {name}
              </div>
            )} */}
            <p className="text-white">{fullName ? fullName : 'N/A'}</p>
          </div>
        );
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusValue = statusList(status);
        return (
          <div
            className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}
          >
            {statusValue.name}
          </div>
        );
      },
    },
    {
      title: t('total'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => {
        return <>{`${totalPrice} USD`}</>;
      },
    },
    {
      title: t('dateAdded'),
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (createdOn) => moment(createdOn).format('DD-MM-YYYY'),
    },
    {
      title: t('dateModified'),
      dataIndex: 'lastModifiedOn',
      key: 'lastModifiedOn',
      render: (lastModifiedOn) => moment(lastModifiedOn).format('DD-MM-YYYY'),
    },
  ];

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <AddOrder show={showAdd} setShow={setShowAdd} />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          dateRageFilter={true}
          statusFilter={statusList()}
          hideActions
          fieldToFilter="orderNo"
          btnData={{
            text: 'Add Order',
            onClick: () => setShowAdd(true),
          }}
          handleStatus={async (values) => {
            setStatus(values);
            let details = {
              status: values,
              userId: user?.id,
            };

            if (startDate && endDate) {
              details['startDate'] = startDate;
              details['endDate'] = endDate;
            }
            await dispatch(getOrders(details));
          }}
          handleDateRange={async (date, dateString, id) => {
            let startDate = '';
            let endDate = '';
            let details = {
              userId: user?.id,
            };
            if (date) {
              startDate = date[0]._d;
              endDate = date[1]._d;
              details['startDate'] = startDate;
              details['endDate'] = endDate;
            }

            if (status) {
              details['status'] = status;
            }

            setStartDate(startDate);
            setEndDate(endDate);
            await dispatch(getOrders(details));
          }}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
