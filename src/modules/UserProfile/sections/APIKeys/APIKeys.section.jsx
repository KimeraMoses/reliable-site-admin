import {
  Button,
  // Select,
  Tooltip,
} from 'antd';
import {
  Copy,
  //  Down
} from 'icons';
import { Table } from 'components';
import './APIKeys.styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Add, EditAPIKey } from './sections';
import { checkModule } from 'lib/checkModule';
import { useSelector, useDispatch } from 'react-redux';
import { getAPIKeysByUID } from 'store';

export const APIKeys = () => {
  const [show, setShow] = useState(false);
  // const [selectedSort, setSelectedSort] = useState('label');
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // Edit Modal State Start
  const [showEdit, setShowEdit] = useState(false);
  const [apikey, setApikey] = useState({});
  // Edit Modal State End

  const { userModules } = useSelector((state) => state?.modules);
  const { apiKeys, loading } = useSelector((state) => state?.apiKeys);
  const { user } = useSelector((state) => state?.auth);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  const { t } = useTranslation('/Users/ns');

  const columns = [
    {
      title: t('label'),
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: t('apiKey'),
      dataIndex: 'apiKey',
      key: 'apiKey',
      render: (text) => {
        return (
          <div className="flex gap-[8px] items-center">
            <div>{text}</div>
            <Tooltip title="Copied!" trigger="click">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
                className="cursor-pointer"
              >
                <Copy />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: t('createDate'),
      key: 'createdAt',
      dataIndex: 'createdAt',
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
  ];

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

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAPIKeysByUID(user?.id));
    }
  }, [user]);

  useEffect(() => {
    if (apiKeys) {
      let dataArr = [];
      apiKeys.forEach((key) => {
        dataArr.push({
          key: key?.id,
          label: key?.label !== null ? key?.label : 'N/A',
          apiKey: key?.applicationKey,
          createdAt: key?.createdAt ? key?.createdAt : 'N/A',
          status: key?.statusApi ? 'Active' : 'Inactive',
          validTill: key?.validTill,
          tenant: key?.tenant,
        });
      });
      setData(dataArr);
    }
  }, [apiKeys]);

  // TODO: Sort Logic once Sorted :D
  // useEffect(() => {
  //   data.sort((a, b) => {
  //     if (a[selectedSort] && b[selectedSort]) {
  //       return a?.[selectedSort]?.localeCompare(b?.[selectedSort]);
  //     }
  //     return a > b;
  //   });
  //   setData(data);
  // }, [selectedSort]);

  // const onSelectChange = (e) => {
  //   setSelectedSort(e);
  // };

  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px] pb-[32px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">API Keys</h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      <div className="up-api-keys__table">
        <Table
          data={data}
          columns={columns}
          loading={loading}
          additionalBtns={
            selectedRows?.length
              ? [
                  { text: 'Enable', onClick: () => {} },
                  { text: 'Disable', onClick: () => {} },
                  { text: 'Delete', onClick: () => {} },
                ]
              : []
          }
          btnData={{ text: 'Add API Key', onClick: () => setShow(true) }}
          fieldToFilter="label"
          pagination={false}
          rowSelection={rowSelection}
          editAction={(record) => (
            <>
              <Button
                onClick={() => {
                  setApikey(record);
                  setShowEdit(true);
                }}
              >
                Edit
              </Button>
              <Button>Permissions</Button>
            </>
          )}
          permissions={permissions}
          t={t}
          // customFilterSort={
          //   <>
          //     <Select
          //       className="min-w-[235px] bg-[#171723]"
          //       onChange={onSelectChange}
          //       dropdownClassName="custom-select-dropdown"
          //       value={selectedSort}
          //       suffixIcon={<Down />}
          //     >
          //       {columns?.map((el) => {
          //         return (
          //           <Select.Option key={el?.key} value={el?.key}>
          //             {t('sortBy')} {el?.title}
          //           </Select.Option>
          //         );
          //       })}
          //     </Select>
          //   </>
          // }
        />
      </div>
      {/* Modals */}
      <Add show={show} setShow={setShow} />
      <EditAPIKey show={showEdit} setShow={setShowEdit} apikey={apikey} />
    </div>
  );
};
