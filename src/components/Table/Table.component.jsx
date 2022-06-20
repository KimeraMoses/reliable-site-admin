import { Input, Button, Table as AntTable, Dropdown, DatePicker } from 'antd';
import { Dropdown as DropdownIcon } from 'icons';
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
  emptyText,
  customFilterSort,
  loading,
  permissions,
  editAction,
  deleteAction,
  viewAction,
  additionalBtns,
  hideActions,
  hideHeaders,
  customAdditionalBody,
  dateRangeSelector,
  dateRageFilter = false,
  statusFilter = [],
  handleStatus,
  statusFilterPlaceholder,
  handleDateRange,
  hideSearch,
  theme,
  rowKey,
  scroll,
  size,
  headingTitle,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (fieldToFilter !== null && fieldToFilter !== undefined) {
      const filteredData = data.filter((item) => {
        if (item[fieldToFilter] !== null && item[fieldToFilter] !== undefined) {
          return item[fieldToFilter]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        }
        return false;
      });
      setFiltered(filteredData);
    }
  }, [data, fieldToFilter, search]);

  // const onOpenChange = (open) => {
  //   console.log(open);
  // }

  // Only Set Data if there are view permissions
  useEffect(() => {
    let dataViewer = [];
    if (permissions !== undefined && permissions !== null && permissions.View) {
      dataViewer = filtered.length ? filtered : data;
    }
    setDataSource(dataViewer);
  }, [data, filtered, permissions]);
  // Only Add Actions if there are Update & Delete permissions
  useEffect(() => {
    if (permissions !== undefined && permissions !== null && !hideActions) {
      const actionColumn =
        (permissions?.View && viewAction) ||
        permissions?.Remove ||
        permissions?.Update
          ? {
              title: 'Actions',
              key: 'actions',
              align: 'right',
              render: (text, record) => (
                <div className="flex items-center justify-end">
                  <Dropdown
                    overlayClassName="custom-table__table-dropdown-overlay"
                    className="custom-table__table-dropdown"
                    destroyPopupOnHide
                    placement="bottomRight"
                    overlay={
                      <>
                        {viewAction && permissions?.View && viewAction(record)}
                        {editAction &&
                          permissions?.Update &&
                          editAction(record)}
                        {deleteAction &&
                          permissions?.Remove &&
                          deleteAction(record)}
                      </>
                    }
                    trigger={['click']}
                  >
                    <Button
                      type="primary"
                      className="custom-table__table-dropdown-btn"
                    >
                      <div>{'Actions'}</div>
                      <div>
                        <DropdownIcon />
                      </div>
                    </Button>
                  </Dropdown>
                </div>
              ),
            }
          : {};
      setTableColumns([...columns, actionColumn]);
    } else {
      setTableColumns(columns);
    }
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div
      className={`custom-table ${theme === 'dark' ? 'custom-table-dark' : ''}`}
    >
      {/* Header */}
      {permissions !== undefined && permissions !== null ? (
        <>
          <div className="flex items-center justify-between custom-table__top-row">
            {/* Input */}
            <div>
              {
                <>
                  {permissions?.Search ? (
                    <>
                      {customFilterSort ? (
                        customFilterSort
                      ) : (
                        <>
                          {hideSearch ? (
                            <></>
                          ) : (
                            <Input
                              placeholder={'Search Here'}
                              prefix={<Search />}
                              className="custom-table__input"
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              }
            </div>
            {/* Button */}

            <div className="flex items-center gap-[8px]">
              {dateRageFilter && (
                <RangePicker
                  onChange={(date, dateString, id) =>
                    handleDateRange(date, dateString, id)
                  }
                  dropdownClassName="custom-date-picker-dd"
                  format="YYYY-MM-DD    "
                  placeholder={['Date Range']}
                  className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
                />
              )}
              {statusFilter?.length ? (
                <select
                  onChange={(e) => handleStatus(e.target.value)}
                  className="custom-select form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0"
                >
                  <option value="">
                    {statusFilterPlaceholder || 'Status'}
                  </option>
                  {statusFilter.map((data, i) => (
                    <option value={data?.value || i} key={'status-' + i}>
                      {data.name}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}

              {additionalBtns?.length ? (
                additionalBtns?.map((btn) => {
                  return (
                    <Button
                      type="primary"
                      className={`px-[32px] border-none rounded-[8px] h-[52px] bg-[#212E48] hover:bg-[#212E48] active:bg-[#212E48] focus:bg-[#212E48] text-[#3699FF] hover:text-[#3699FF] active:text-[#3699FF] focus:text-[#3699FF] ${btn?.customClass}`}
                      onClick={btn?.onClick}
                    >
                      {btn.text}
                    </Button>
                  );
                })
              ) : customAdditionalBody ? (
                <>{customAdditionalBody}</>
              ) : (
                <></>
              )}
              {dateRangeSelector ? dateRangeSelector : <></>}
              {btnData?.text && btnData?.onClick && permissions?.Create ? (
                <Button
                  type="primary"
                  className={`custom-table__btn px-[32px] ${btnData?.customClass}`}
                  onClick={btnData?.onClick}
                >
                  {btnData.text}
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          {headingTitle && (
            <h3 className={'text-[#fff] text-[32px] mt-[40px]'}>
              {headingTitle}
            </h3>
          )}

          {/* Header End */}
          {/* Table */}
          <div
            className={`custom-table__table ${
              hideHeaders ? 'custom-table__table-hide-headers' : ''
            }`}
          >
            <AntTable
              columns={tableColumns}
              rowKey={rowKey}
              scroll={scroll}
              dataSource={dataSource}
              size={size}
              pagination={
                pagination !== undefined && pagination !== null
                  ? pagination
                  : { position: ['bottomLeft'], showSizeChanger: false }
              }
              rowSelection={rowSelection}
              loading={permissions?.View ? loading : false}
              locale={{
                emptyText: permissions?.View
                  ? emptyText || 'No Data'
                  : 'You are not authorized to view this data.',
              }}
            />
          </div>
        </>
      ) : (
        <h3 className="text-white">
          Please enable permissions to view the table.
        </h3>
      )}
      {/* Table End */}
    </div>
  );
};
