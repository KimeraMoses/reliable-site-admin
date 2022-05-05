import * as Yup from 'yup';
import { Modal } from 'components';

const fields = [
  {
    name: 'label',
    type: 'input',
    title: 'Label',
    placeholder: 'Navitare',
  },
  {
    name: 'createdAt',
    type: 'input',
    title: 'Created',
    placeholder: 'Sunday, March 27th, 2022 at 04:30 PM',
  },
  {
    name: 'status',
    type: 'select',
    options: [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'INACTIVE', value: 'INACTIVE' },
    ],
    title: 'Status',
  },
  {
    name: 'tenant',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Client', value: 'client' },
    ],
    title: 'Tenant',
  },
  {
    name: 'expiresAt',
    type: 'input',
    title: 'Expires',
    placeholder: 'Sunday, March 27th, 2022 at 04:30 PM',
  },
];

const initialValues = {
  label: '',
  createdAt: '',
  status: 'ACTIVE',
  tenant: 'admin',
  expiresAt: '',
};

const validationSchema = Yup.object().shape({
  label: Yup.string().required('Label is required'),
  createdAt: Yup.string().required('Created is required'),
  status: Yup.string().required('Status is required'),
  tenant: Yup.string().required('Tenant is required'),
  expiresAt: Yup.string().required('Expires is required'),
});

export const AddAPIKey = ({ show, setShow, handleSubmit }) => {
  return (
    <Modal
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      heading="Add API Key"
      submitText="Configure Permissions"
      handleSubmit={(values) => {
        console.log(values);
        handleSubmit();
      }}
    />
  );
};
