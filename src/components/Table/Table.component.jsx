import { Input, Button, Table as AntTable } from 'antd';
import { Search } from 'icons';
import { useEffect, useState } from 'react';

import './Table.styles.scss';

// Methods to Select Rows
// const rowSelectionMethods = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

export const Table = ({
  columns,
  data,
  fieldToFilter = 'name',
  btnData,
  pagination,
  rowSelection,
  customFilterSort,
}) => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (fieldToFilter) {
      const filteredData = data.filter((item) => {
        return item[fieldToFilter].toLowerCase().includes(search.toLowerCase());
      });
      setFiltered(filteredData);
    }
  }, [data, fieldToFilter, search]);

  return (
    <div className="custom-table">
      {/* Header */}
      <div className="flex items-center justify-between custom-table__top-row">
        {/* Input */}
        <div>
          {customFilterSort ? (
            customFilterSort
          ) : (
            <Input
              placeholder="Search Here"
              prefix={<Search />}
              className="custom-table__input"
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
        {/* Button */}
        <div>
          {btnData?.text && btnData?.onClick ? (
            <Button
              type="primary"
              className="custom-table__btn"
              onClick={btnData?.onClick}
            >
              {btnData.text}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* Header End */}
      {/* Table */}
      <div className="custom-table__table">
        <AntTable
          columns={columns}
          dataSource={filtered || data}
          pagination={
            pagination !== undefined && pagination !== null
              ? pagination
              : { position: ['bottomLeft'], showSizeChanger: false }
          }
          rowSelection={rowSelection}
        />
      </div>
      {/* Table End */}
    </div>
  );
};
