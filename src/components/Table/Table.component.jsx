import { Input, Button, Table as AntTable } from 'antd';
import { Search } from 'icons';
import { useEffect, useState } from 'react';

import './Table.styles.scss';

export const Table = ({ columns, data, fieldToFilter = 'name', btnData }) => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return item[fieldToFilter].toLowerCase().includes(search.toLowerCase());
    });
    setFiltered(filteredData);
  }, [data, fieldToFilter, search]);

  return (
    <div className="custom-table">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Input */}
        <div>
          <Input
            placeholder="Search Here"
            prefix={<Search />}
            className="custom-table__input"
            onChange={(e) => setSearch(e.target.value)}
          />
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
          pagination={{ position: ['bottomLeft'], showSizeChanger: false }}
        />
      </div>
      {/* Table End */}
    </div>
  );
};
