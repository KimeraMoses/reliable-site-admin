import { Input, Select, Table as AntdTable, Button } from 'antd';
import { Search } from 'icons';
import { useEffect, useState } from 'react';
import './Table.styles.scss';

const { Option } = Select;

// Pagination Items
function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <div>{/* <ArrowLeft /> */}</div>;
  }
  if (type === 'next') {
    return <div>{/* <ArrowRight /> */}</div>;
  }
  return originalElement;
}

export function Table({ data, columns, rowSelection, buttons, pageSize = 5 }) {
  const [selectedFilter, setSelectedFilter] = useState(columns[0]?.dataIndex);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      setSearchText(searchText);
      const search = searchText.toLowerCase();
      const newData = data.filter((item) => {
        const value =
          typeof item[selectedFilter] === 'number'
            ? item[selectedFilter].toString().toLowerCase()
            : item[selectedFilter].toLowerCase();
        return value.indexOf(search) !== -1;
      });
      if (newData.length) {
        setFilteredData(newData);
      } else {
        setFilteredData([
          {
            key: 'Not Found',
            uid: 'Not Found',
            name: 'Not Found',
            status: 'Not Found',
            last_check_in: 'Not Found',
            last_check_out: 'Not Found',
          },
        ]);
      }
    } else {
      setFilteredData([]);
    }
  }, [searchText, selectedFilter]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="custom-table">
      <div>
        <div className="custom-table__filters">
          <div className="custom-table__filters-search-wrapper">
            <Input
              className="custom-table__filters-search"
              placeholder="Search Here"
              prefix={<Search />}
              onChange={handleSearch}
            />

            <Select
              value={selectedFilter}
              className="custom-table__filters-select"
              dropdownClassName="custom-select__dropdown"
              onChange={(selected) => {
                setSelectedFilter(selected);
              }}
            >
              {columns?.map((col) => {
                return (
                  <Option key={col?.dataIndex} value={col?.dataIndex}>
                    Status {col?.title}
                  </Option>
                );
              })}
            </Select>
            <Button className="custom-table__order-btn">View All Orders</Button>
          </div>
          <div className="custom-table__filters-buttons">
            {buttons?.map((btn) => {
              return (
                <Button
                  key={btn?.title}
                  variant={btn?.variant}
                  onClick={btn?.onClick}
                  disabled={btn?.disabled}
                >
                  {btn?.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <AntdTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData.length ? filteredData : data}
        className="custom-table__el"
        showSorterTooltip={false}
        pagination={{
          pageSize,
          itemRender,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} Records`,
        }}
        scroll={{ x: true }}
      />
    </div>
  );
}
