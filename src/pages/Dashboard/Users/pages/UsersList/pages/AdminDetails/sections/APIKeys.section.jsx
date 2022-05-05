import { Button, Dropdown, Select } from 'antd';
import { Copy, Down, Dropdown as DropdownIcon } from 'icons';
import { Table } from 'components';
import './APIKeys.styles.scss';
import { useEffect, useState } from 'react';

export const APIKeys = () => {
  const [selectedSort, setSelectedSort] = useState('label');
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'API Key',
      dataIndex: 'apiKey',
      key: 'apiKey',
      render: (text) => {
        return (
          <div className="flex gap-[8px] items-center">
            <div>{text}</div>
            <div>
              <Copy />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Created',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
          {status}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlayClassName="custom-table__table-dropdown-overlay"
          className="custom-table__table-dropdown"
          destroyPopupOnHide
          placement="bottomRight"
          overlay={
            <>
              {/* TODO: Replace with UID */}
              <Button onClick={() => {}}>View</Button>
              <Button>Edit</Button>
            </>
          }
          trigger={['click']}
        >
          <Button type="primary" className="custom-table__table-dropdown-btn">
            <div>Actions</div>
            <div>
              <DropdownIcon />
            </div>
          </Button>
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  useEffect(() => {
    const data = [];
    for (let i = 10; i > 0; i--) {
      data.push({
        key: i,
        label: `API Key ${i}`,
        apiKey: `${i}0asdwr${i}asd${i}`,
        createdAt: 'Sunday, March 27th, 2022 at 04:30 PM',
        status: `ACTIVE`,
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
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">API Keys</h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      <div className="api-keys__table">
        <Table
          data={data}
          columns={columns}
          btnData={{ text: 'Add API Key', onClick: () => {} }}
          fieldToFilter="label"
          pagination={false}
          rowSelection={rowSelection}
          customFilterSort={
            <>
              <Select
                className="min-w-[235px] bg-[#171723]"
                onChange={onSelectChange}
                dropdownClassName="custom-select-dropdown"
                value={selectedSort}
                suffixIcon={<Down />}
              >
                {columns?.map((el) => {
                  return (
                    <Select.Option key={el?.key} value={el?.key}>
                      SORT BY : {el?.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </>
          }
        />
      </div>
    </div>
  );
};