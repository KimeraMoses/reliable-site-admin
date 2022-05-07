import { Select } from 'antd';
import { Down } from 'icons';
import { Table } from 'components';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';

export const LoginSessions = () => {
  const [selectedSort, setSelectedSort] = useState('1 Hr');
  const [data, setData] = useState([]);

  const { t } = useTranslation('Users/ns');

  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  const columns = [
    {
      title: t('location'),
      dataIndex: 'location',
      key: 'location',
    },
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
      title: t('device'),
      key: 'device',
      dataIndex: 'device',
    },
    {
      title: t('ipAddressShort'),
      key: 'ipAddress',
      dataIndex: 'ipAddress',
    },
    {
      title: t('time'),
      key: 'time',
      dataIndex: 'time',
    },
  ];

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= 4; i++) {
      data.push({
        key: i,
        location: `Location ${i}`,
        status: `OK`,
        device: 'Chrome - Windows',
        ipAddress: '236.125.56.78',
        time: '2 Mins Ago',
      });
    }

    data.sort((a, b) => {
      if (a[selectedSort] && b[selectedSort]) {
        return a?.[selectedSort]?.localeCompare(b?.[selectedSort]);
      }
      return a > b;
    });
    setData(data);
  }, [selectedSort]);

  const onSelectChange = (e) => {
    setSelectedSort(e);
  };

  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
        {t('loginSessions')}
      </h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      <div className="up-custom-logs__table pb-[30px]">
        <Table
          data={data}
          columns={columns}
          fieldToFilter={'location'}
          btnData={{ text: t('viewAll'), onClick: () => {} }}
          pagination={false}
          permissions={permissions}
          hideActions
          t={t}
          customFilterSort={
            <>
              <Select
                className="min-w-[235px] bg-[#171723]"
                onChange={onSelectChange}
                dropdownClassName="custom-select-dropdown"
                value={selectedSort}
                suffixIcon={<Down />}
              >
                <Select.Option value="1 Hr">1 Hours</Select.Option>
              </Select>
            </>
          }
        />
      </div>
    </div>
  );
};
