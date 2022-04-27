import { Select } from 'antd';
import { Down } from 'icons';
import { Table } from 'components';
import './APIKeys.styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Logs = () => {
  const [selectedFilter, setSelectedFilter] = useState('status');
  const [data, setData] = useState([]);

  const { t } = useTranslation('/Users/ns');

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
      title: t('reqDate'),
      key: 'reqDate',
      dataIndex: 'reqDate',
    },
  ];

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= 4; i++) {
      data.push({
        key: i,
        status: `200 OK`,
        url: 'POST /v1/invoices/in_2664_9528/payment',
        reqDate: `Sunday, March 27th, 2022 at 05:00 PM`,
      });
    }

    // User your filter logic here

    setData(data);
  }, [selectedFilter]);

  const onSelectChange = (e) => {
    setSelectedFilter(e);
  };

  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
        {t('logs')}
      </h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      <div className="api-keys__table pb-[30px]">
        <Table
          data={data}
          columns={columns}
          fieldToFilter={'status'}
          btnData={{ text: t('downloadReport'), onClick: () => {} }}
          pagination={false}
          customFilterSort={
            <>
              <Select
                className="min-w-[235px] bg-[#171723]"
                onChange={onSelectChange}
                dropdownClassName="custom-select-dropdown"
                value={selectedFilter}
                suffixIcon={<Down />}
              >
                {columns?.map((el) => (
                  <Select.Option value={el?.key} key={el?.key}>
                    {t('filterBy')} {el?.title}
                  </Select.Option>
                ))}
              </Select>
            </>
          }
        />
      </div>
    </div>
  );
};
