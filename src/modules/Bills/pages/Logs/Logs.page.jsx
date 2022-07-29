import moment from 'moment';
import { Table } from 'components';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { exportToExcel } from 'lib';
import { getLogs } from 'store';

export default function Logs() {
  const [data, setData] = useState([]);

  const { t } = useTranslation('/Users/ns');

  const { logs, loading } = useSelector((state) => state?.logs);
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Logs',
    modules: userModules,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const columns = [
    {
      title: t('status'),
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
          {status}
        </div>
      ),
    },
    {
      title: t('url'),
      key: 'url',
      dataIndex: 'url',
    },
    {
      title: 'User',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: t('reqDate'),
      key: 'reqDate',
      dataIndex: 'reqDate',
    },
    // {
    //   title: 'Description',
    //   key: 'description',
    //   dataIndex: 'description',
    // },
  ];

  // Set Data to Fetched Logs
  useEffect(() => {
    const dataHolder = [];
    logs.forEach((log) => {
      dataHolder.push({
        key: log?.id,
        status: '200 OK',
        url: `${log?.type} ${log?.tableName}`,
        user: log?.fullName ? log?.fullName : 'N/A',
        // description: log?.text,
        reqDate: moment(log?.dateTime).format(
          'dddd, MMMM Do, YYYY [at] h:mm:ss a'
        ),
      });
    });
    setData(dataHolder);
  }, [logs]);

  return (
    <div className="p-[40px]">
      <div className="bg-[#1E1E2D] rounded-[8px]">
        <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
          {t('logs')}
        </h6>
        <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
        <div className="p-[20px]">
          <Table
            data={data}
            columns={columns}
            fieldToFilter={'url'}
            t={t}
            btnData={{
              text: 'Download Logs',
              onClick: () => {
                exportToExcel(logs);
              },
            }}
            pagination={{
              pageSize: 10,
              position: ['bottomLeft'],
              showSizeChanger: false,
            }}
            hideActions
            permissions={permissions}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
