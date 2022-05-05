import { Input, Button, Table as AntTable, Dropdown } from 'antd';
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
  customFilterSort,
  loading,
  permissions,
  editAction,
  deleteAction,
  viewAction,
  additionalBtns,
  t,
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
    if (permissions !== undefined && permissions !== null) {
      const actionColumn =
        (permissions?.View && viewAction) ||
        permissions?.Remove ||
        permissions?.Update
          ? {
              title: t('actions'),
              key: 'actions',
              render: (text, record) => (
                <Dropdown
                  overlayClassName="custom-table__table-dropdown-overlay"
                  className="custom-table__table-dropdown"
                  destroyPopupOnHide
                  placement="bottomRight"
                  overlay={
                    <>
                      {viewAction && permissions?.View && viewAction(record)}
                      {editAction && permissions?.Update && editAction(record)}
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
                    <div>{t ? t('actions') : 'Actions'}</div>
                    <div>
                      <DropdownIcon />
                    </div>
                  </Button>
                </Dropdown>
              ),
            }
          : {};
      setTableColumns([...columns, actionColumn]);
    }
  }, []);

  return (
    <div className="custom-table">
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
                        <Input
                          placeholder={'Search Here'}
                          prefix={<Search />}
                          className="custom-table__input"
                          onChange={(e) => setSearch(e.target.value)}
                        />
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
              {additionalBtns?.length ? (
                additionalBtns?.map((btn) => {
                  return (
                    <Button
                      type="primary"
                      className="px-[32px] border-none rounded-[8px] h-[52px] bg-[#212E48] hover:bg-[#212E48] active:bg-[#212E48] focus:bg-[#212E48] text-[#3699FF] hover:text-[#3699FF] active:text-[#3699FF] focus:text-[#3699FF]"
                      onClick={btn?.onClick}
                    >
                      {btn.text}
                    </Button>
                  );
                })
              ) : (
                <></>
              )}
              {btnData?.text && btnData?.onClick && permissions?.Create ? (
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
              columns={tableColumns}
              dataSource={dataSource}
              pagination={
                pagination !== undefined && pagination !== null
                  ? pagination
                  : { position: ['bottomLeft'], showSizeChanger: false }
              }
              rowSelection={rowSelection}
              loading={permissions?.View ? loading : false}
              locale={{
                emptyText: permissions?.View
                  ? 'No Data'
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
