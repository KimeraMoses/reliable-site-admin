import { Button } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Table } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';

export const ClientNotifications = () => {
  const navigate = useNavigate();

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
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Total Clients',
      dataIndex: 'totalUsers',
      key: 'totalUsers',
    },
    {
      title: 'Starts',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (key) => moment(key).format('MM/DD/YYYY'),
    },
    {
      title: 'Ends',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (key) => moment(key).format('MM/DD/YYYY'),
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const getInfo = ({ type }) => {
          switch (type) {
            case 0:
              return { styles: 'bg-[#1C3238] text-[#0BB783]', title: 'Active' };
            case 1:
              return {
                styles: 'bg-[#392F28] text-[#FFA800]',
                title: 'Disabled',
              };
            case 2:
              return {
                styles: 'bg-[#3A2434] text-[#F64E60]',
                title: 'Expired',
              };
            default:
              return { styles: 'bg-[#1C3238] text-[#0BB783]', title: 'Active' };
          }
        };

        const { styles, title } = getInfo({ type: text });
        return (
          <div
            className={`w-[fit-content] py-[4px] px-[8px] text-[12px] rounded-[4px] uppercase ${styles}`}
          >
            {title}
          </div>
        );
      },
    },
  ];

  const data = [];
  for (let i = 0; i <= 40; i++) {
    data.push({
      key: i,
      id: i,
      title: `Notification ${i}`,
      totalUsers: i + 2,
      startDate: moment(),
      endDate: moment().add(5, 'days'),
      status: i % 2 === 0 ? 0 : 2,
    });
  }

  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedRows(selectedRows);
    },
  };

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          data={data}
          // loading={loading}
          fieldToFilter="name"
          btnData={{
            text: 'Add New',
            onClick: () =>
              navigate(
                '/admin/dashboard/billing/clients/show-notifications/client-notifications/add/new'
              ),
            customClass: 'w-[fit_content]',
          }}
          rowSelection={rowSelection}
          additionalBtns={
            selectedRows?.length
              ? [
                  {
                    text: 'Delete Selected',
                    onClick: () => {},
                  },
                ]
              : []
          }
          editAction={(record) => {
            return <Button>Edit</Button>;
          }}
          deleteAction={(record) => {
            return <Button>Delete</Button>;
          }}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
