import { Button, Switch } from 'antd';
import * as Yup from 'yup';
import { Modal, Table } from 'components';
import './UsersGroups.styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';
import { getGroupPermissions, getUserGroups } from 'store';
import { AddGroup, AddPermissions, EditPermissions } from './sections';
import { deleteGroup } from 'store';

export const UsersGroups = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [addPermissions, setAddPermissions] = useState({
    show: false,
    values: [],
  });
  const [editModal, setEditModal] = useState({ show: false, values: {} });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [activeEditGroup, setActiveEditGroup] = useState(null);

  const { t } = useTranslation('/Users/ns');

  //Integration Logic
  // Getting User Level and App Level Modules and Checking If user has permissions for group management
  const { userModules, appModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  // Setting Module Fields Dynamically

  // Get User Groups
  const { userGroups, loading, groupPermissions, group } = useSelector(
    (state) => state?.userGroups
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserGroups());
  }, [dispatch]);
  useEffect(() => {
    if (userGroups.length) {
      let dataArr = [];
      userGroups.forEach((group) => {
        dataArr.push({
          key: group?.id,
          id: group?.id,
          name: group?.groupName,
          isDefault: group?.isDefault,
          status: group?.status,
          numberOfUsers: group?.numberOfUsers
            ? Number(group?.numberOfUsers)
            : 0,
          createdAt: group?.createdAt ? group?.createdAt : 'N/A',
        });
      });
      setDataSource(dataArr);
    }
  }, [userGroups]);
  // Group Permissions
  // End Integration Logic

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: t('numberOfUsers'),
      dataIndex: 'numberOfUsers',
      key: 'numberOfUsers',
      width: '20%',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (text, record) => {
        return <Switch checked={record?.status} disabled />;
      },
    },
    {
      title: t('createDate'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '20%',
    },
  ];

  return (
    <div className="users">
      <div className="users__inner">
        <div className="users-groups">
          {/* Add Modal (first in adding a group) */}
          <AddGroup
            t={t}
            appModules={appModules}
            showAdd={showAdd}
            loading={loading}
            setShowAdd={setShowAdd}
            setPermissionsShow={setAddPermissions}
          />
          {/* Permissions Modal (second in adding a group) */}
          <AddPermissions
            t={t}
            loading={loading}
            activeGroup={group}
            addPermissions={addPermissions}
            setAddPermissions={setAddPermissions}
          />
          {/* Permissions Edit */}
          <EditPermissions
            groupPermissions={groupPermissions}
            appModules={appModules}
            activeEditGroup={activeEditGroup}
            setActiveEditGroup={setActiveEditGroup}
            loading={loading}
            t={t}
          />
          {/* Edit Modal */}
          <Modal
            show={editModal?.show}
            initialValues={editModal?.values}
            // fields={addFields}
            setShow={setEditModal}
            heading={t('editGroup')}
            handleSubmit={(values) => {
              console.log(values);
            }}
            handleCancel={() => {
              setEditModal({ show: false, values: {} });
            }}
          />
          {/* Delete Modal */}
          <Modal
            show={deleteModal?.show}
            setShow={setDeleteModal}
            heading={t('deleteGroup')}
            loading={loading}
            customBody={
              <div>
                <p style={{ marginBottom: '32px' }}>{t('deleteWarning')}</p>
              </div>
            }
            fields={[]}
            validationSchema={Yup.object().shape({})}
            initialValues={{}}
            submitText={t('deleteGroup')}
            handleSubmit={async () => {
              await dispatch(deleteGroup(deleteModal?.id));
              setDeleteModal({ show: false, id: null });
            }}
          />
          <Table
            columns={columns}
            data={dataSource}
            loading={loading}
            fieldToFilter="name"
            btnData={{ text: t('addGroup'), onClick: () => setShowAdd(true) }}
            editAction={(record) => (
              <>
                <Button
                  onClick={() => setEditModal({ show: true, values: record })}
                >
                  {t('editSettings')}
                </Button>
                <Button
                  onClick={async () => {
                    await dispatch(getGroupPermissions(record?.id));
                    setActiveEditGroup(record);
                  }}
                >
                  {t('editPermissions')}
                </Button>
              </>
            )}
            deleteAction={(record) => (
              <Button
                onClick={() => setDeleteModal({ show: true, id: record?.id })}
              >
                Delete Group
              </Button>
            )}
            permissions={permissions}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};
