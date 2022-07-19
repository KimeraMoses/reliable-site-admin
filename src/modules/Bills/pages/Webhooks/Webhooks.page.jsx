import { Button, Switch } from 'antd';
import { Table } from 'components';
import { checkModule } from 'lib/checkModule';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWebHooks } from 'store/Actions/webhooks';
import { AddWebhook, DeleteWebhook, EditWebhook } from './sections';

const columns = [
  {
    title: 'Webhook URL',
    dataIndex: 'webHookUrl',
    key: 'webHookUrl',
    width: '20%',
  },
  {
    title: 'API Key',
    dataIndex: 'apiKey',
    key: 'apiKey',
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (value) => <Switch checked={value} disabled={true} />,
  },
  {
    title: 'Content Type',
    dataIndex: 'contentType',
    key: 'contentType',
  },
  // [ 0 = hook, 1 = file, 2 = note, 3 = project, 4 = milestone ]
  {
    title: 'Events',
    dataIndex: 'hookEvents',
    key: 'hookEvents',
    render: (events) => (
      <>
        {events?.map((evt) => (
          <p>{evt}</p>
        ))}
      </>
    ),
  },
];

const WebHooks = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWebHooks());
  }, []);

  const { webhooks, loading } = useSelector((state) => state.webhooks);

  // Check for permissions Start
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  // Check for permissions End

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    if (webhooks.length) {
      const dataToSet = webhooks.map((pg) => {
        return {
          ...pg,
          key: pg?.id,
        };
      });
      setData(dataToSet);
    }
  }, [webhooks]);

  return (
    <div className="m-[40px] p-[40px] bg-[#1E1E2D] rounded-[8px]">
      <AddWebhook show={addModalShow} setShow={setAddModalShow} />
      <EditWebhook
        show={editModalShow}
        setShow={setEditModalShow}
        editValue={editValue}
      />
      <DeleteWebhook
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        id={deleteID}
      />
      <Table
        columns={columns}
        data={data}
        permissions={permissions}
        loading={loading}
        fieldToFilter="name"
        btnData={{
          text: 'Add WebHook',
          onClick: () => setAddModalShow(true),
        }}
        editAction={(record) => (
          <Button
            onClick={() => {
              setEditValue(record);
              setEditModalShow(true);
            }}
          >
            Edit
          </Button>
        )}
        deleteAction={(record) => (
          <Button
            className="focus:bg-[unset]"
            onClick={() => {
              setDeleteID(record?.id);
              setDeleteModalShow(true);
            }}
          >
            Delete
          </Button>
        )}
      />
    </div>
  );
};

export default WebHooks;
