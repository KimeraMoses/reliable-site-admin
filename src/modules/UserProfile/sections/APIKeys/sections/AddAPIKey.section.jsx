import * as Yup from 'yup';
import { Modal } from 'components';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AddPermissions } from './AddPermissions.section';

const fields = [
  {
    name: 'label',
    type: 'input',
    title: 'Label',
    placeholder: 'Navitare',
  },
  {
    name: 'status',
    type: 'switch',
    title: 'Status',
  },
  {
    name: 'tenant',
    type: 'select',
    options: [{ label: 'Admin', value: 'admin' }],
    title: 'Tenant',
  },
  {
    name: 'validTill',
    type: 'date',
    title: 'Expires',
    placeholder: 'Sunday, March 27th, 2022 at 04:30 PM',
  },
];

const initialValues1 = {
  applicationKey: nanoid(),
  userIds: '',
  validTill: '',
  statusApi: true,
  tenant: '',
  label: '',
};

const validationSchema1 = Yup.object().shape({
  label: Yup.string().required('Label is required'),
  statusApi: Yup.string().required('Status is required'),
  tenant: Yup.string().required('Tenant is required'),
  expiresAt: Yup.string().required('Expires is required'),
});

export const AddAPIKey = ({ show, setShow }) => {
  const [apiKeyInit, setAPIKeyInit] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues1}
        validationSchema={validationSchema1}
        heading="Add API Key"
        submitText="Configure Permissions"
        handleSubmit={(values) => {
          setShow(false);
          setAPIKeyInit(values);
          setShowPermissions(true);
        }}
      />
      <AddPermissions
        show={showPermissions}
        setShow={setShowPermissions}
        apiKeyInit={apiKeyInit}
      />
    </>
  );
};
