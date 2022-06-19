import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { checkModule } from 'lib/checkModule';
import { getTransactions } from 'store';
import { Table, DateRangePicker } from 'components';
import { getName } from 'lib';
import { Formik, Form } from 'formik';

export const Transactions = () => {
  const { t } = useTranslation('/Bills/ns');
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  const dispatch = useDispatch();
  const { loading, transactions } = useSelector((state) => state?.transactions);
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  // Set Columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <>{text.substring(0, 6)}</>,
    },
    {
      title: 'Client',
      dataIndex: 'transactionBy',
      key: 'transactionBy',
      width: '20%',
      render: (text, record) => {
        const { fullName, userImagePath } = record;
        return (
          <div className="flex items-center gap-[12px]">
            {userImagePath ? (
              <img
                src={userImagePath}
                alt={fullName}
                className="h-[40px] w-[40px] object-cover rounded-[8px]"
              />
            ) : (
              <div className="bg-[#171723] h-[40px] w-[40px] rounded-[8px] text-[#0BB783] font-medium text-[20px] flex items-center justify-center">
                {getName({ user: { fullName } })}
              </div>
            )}
            <div>{fullName}</div>
          </div>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (text) => (
        <div className="text-white text-center text-[12px] w-[fit-content] font-medium rounded-[4px] px-[8px] py-[4px] bg-[#323248]">
          {text === 0 ? 'ORDER' : 'REFUND'}
        </div>
      ),
    },
    {
      title: 'Reference ID',
      dataIndex: 'referenceId',
      key: 'referenceId',
      render: (text) => <>{text.substring(0, 6)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'transactionStatus',
      key: 'transactionStatus',
      render: (text) => (
        <div
          className={`${
            text === 0
              ? 'text-[#FFA800] bg-[#392F28]'
              : text === 1
              ? 'text-[#0BB783] bg-[#1C3238]'
              : 'text-[#F64E60] bg-[#3A2434]'
          } px-[8px] py-[4px] text-center rounded-[4px] w-[fit-content] text-[12px] font-medium`}
        >
          {text === 0 ? 'PENDING' : text === 1 ? 'COMPLETED' : 'CANCELLED'}
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => <>{Number(text).toFixed(2)} USD</>,
    },
    {
      title: 'Date Added',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (text) => <>{moment(text).format('MM/DD/YYYY')}</>,
    },
    {
      title: 'Date Modified',
      dataIndex: 'lastModifiedOn',
      key: 'lastModifiedOn',
      render: (text) => <>{moment(text).format('MM/DD/YYYY')}</>,
    },
  ];

  // Filter Data
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const filteredData = transactions.filter((transaction) => {
      if (dateRange?.length) {
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        const compareDate = transaction?.createdOn;
        return moment(compareDate).isBetween(startDate, endDate);
      } else {
        return false;
      }
    });

    setFilteredData(filteredData);
  }, [dateRange]);

  // Set Data with Client Name for Filter
  const [data, setData] = useState([]);
  useEffect(() => {
    if (transactions.length) {
      const dataHolder = transactions.map((transaction) => {
        return {
          key: transaction?.id,
          ...transaction,
        };
      });
      setData(dataHolder);
    }
  }, [transactions]);

  return (
    <Formik initialValues={{ dateRange: [] }}>
      {() => {
        return (
          <Form>
            <div className="p-[40px]">
              <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
                <Table
                  columns={columns}
                  data={filteredData.length ? filteredData : data}
                  loading={loading}
                  fieldToFilter="name"
                  editAction={(record) => (
                    <>
                      <Button onClick={() => {}}>View</Button>
                    </>
                  )}
                  permissions={permissions}
                  dateRangeSelector={
                    <>
                      <DateRangePicker
                        name="dateRange"
                        onChange={(date) => setDateRange(date)}
                      />
                    </>
                  }
                  t={t}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};