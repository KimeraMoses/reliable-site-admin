import { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { checkModule } from 'lib/checkModule';
import { getTransactions } from 'store';
import { Table } from 'components';

export const Transactions = () => {
  const { t } = useTranslation('/Bills/ns');
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
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
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
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

  const dispatch = useDispatch();
  const { loading, transactions } = useSelector((state) => state?.transactions);
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          data={transactions}
          loading={loading}
          fieldToFilter="client"
          editAction={(record) => (
            <>
              <Button onClick={() => {}}>View</Button>
            </>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
