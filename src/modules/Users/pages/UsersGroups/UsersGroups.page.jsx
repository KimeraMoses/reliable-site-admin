import { Button, Switch, Dropdown } from 'antd';
import * as Yup from 'yup';
import { Dropdown as DropdownIcon } from 'icons';
import { Modal, Table } from 'components';
import './UsersGroups.styles.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { checkModule } from 'lib/checkModule';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Group ${i}`,
    numberOfUsers: 32,
    status: 'Active',
    createdAt: '2019-01-01',
  });
}

const initialAddValues = {
  name: '',
  status: false,
  makeDefault: false,
};

const initialPermissionsValue = {
  module1: {
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  module2: {
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  module3: {
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  module4: {
    create: false,
    read: false,
    update: false,
    delete: false,
  },
};

const addValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
  status: Yup.boolean().required('This field is required!'),
  makeDefault: Yup.boolean().required('This field is required!'),
});

export const UsersGroups = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [permissionsInit, setPermissionsInit] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [editModal, setEditModal] = useState({ show: false, values: {} });
  const [editPermissions, setEditPermissions] = useState({
    show: false,
    values: {},
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const { t } = useTranslation('/Users/ns');

  const addFields = [
    {
      type: 'input',
      name: 'name',
      placeholder: 'Group Name',
      title: t('name'),
    },
    {
      type: 'switch',
      name: 'status',
      title: t('status'),
    },
    {
      type: 'switch',
      name: 'makeDefault',
      title: t('makeDefault'),
    },
  ];

  const { userModules, allModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });
  const [add2Fields, setAdd2Fields] = useState([]);

  useEffect(() => {
    if (allModules?.length) {
      let modulesList = [];
      allModules.forEach((module) => {
        modulesList.push({
          type: 'crud',
          name: module?.name,
          title: module?.name,
        });
      });
      setAdd2Fields(modulesList);
    }
  }, [allModules]);

  // const add2Fields = [
  //   {
  //     type: 'crud',
  //     name: 'module1',
  //     title: 'Module 1',
  //   },
  //   {
  //     type: 'crud',
  //     name: 'module2',
  //     title: 'Module 2',
  //   },
  //   {
  //     type: 'crud',
  //     name: 'module3',
  //     title: 'Module 3',
  //   },
  //   {
  //     type: 'crud',
  //     name: 'module4',
  //     title: 'Module 4',
  //   },
  // ];

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
      render: () => {
        return <Switch defaultChecked />;
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
      {add2Fields ? (
        <div className="users__inner">
          <div className="users-groups">
            {/* Add Modal (first in adding a group) */}
            <Modal
              show={showAdd}
              setShow={setShowAdd}
              heading={t('addGroup')}
              submitText={t('configurePermissions')}
              initialValues={initialAddValues}
              validationSchema={addValidationSchema}
              fields={addFields}
              handleSubmit={(values) => {
                setPermissionsInit(values);
                setShowAdd(false);
                setShowPermissions(true);
              }}
            />
            {/* Permissions Modal (second in adding a group) */}
            <Modal
              show={showPermissions}
              setShow={setShowPermissions}
              heading={t('configurePermissions')}
              submitText={t('createGroup')}
              cancelButtonText="Back"
              handleCancel={() => {
                setShowPermissions(false);
                setShowAdd(true);
              }}
              initialValues={{ ...permissionsInit, ...initialPermissionsValue }}
              fields={add2Fields}
              handleSubmit={(values) => {
                console.log(values);
              }}
            />
            {/* Permissions Edit Modal */}
            <Modal
              show={editPermissions?.show}
              setShow={setShowPermissions}
              heading={t('configurePermissions')}
              submitText={t('editPermissionsShort')}
              initialValues={editPermissions?.values}
              fields={add2Fields}
              handleSubmit={(values) => {
                console.log(values);
              }}
              handleCancel={() => {
                setEditPermissions({ show: false, values: {} });
              }}
            />
            {/* Edit Modal */}
            <Modal
              show={editModal?.show}
              initialValues={editModal?.values}
              fields={addFields}
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
              show={deleteModal}
              setShow={setDeleteModal}
              heading={t('deleteGroup')}
              customBody={
                <div>
                  <p style={{ marginBottom: '32px' }}>{t('deleteWarning')}</p>
                </div>
              }
              fields={[]}
              validationSchema={Yup.object().shape({})}
              initialValues={{}}
              submitText={t('deleteGroup')}
              handleSubmit={(values) => {
                console.log('Submitting');
                console.log(values);
              }}
            />
            <Table
              columns={columns}
              data={data}
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
                    onClick={() =>
                      setEditPermissions({ show: true, values: record })
                    }
                  >
                    {t('editPermissions')}
                  </Button>
                </>
              )}
              deleteAction={() => (
                <Button onClick={() => setDeleteModal(true)}>
                  Delete Group
                </Button>
              )}
              permissions={permissions}
              t={t}
            />
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
