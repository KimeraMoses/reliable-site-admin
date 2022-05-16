import * as Yup from 'yup';
import moment from 'moment';
import { Modal } from 'components';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';

const fields = [
  {
    name: 'label',
    type: 'input',
    title: 'Label',
    placeholder: 'Navitare',
  },
  {
    name: 'statusApi',
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
    disableDate: (current) => current && current.valueOf() < Date.now(),
  },
];

const validationSchema = Yup.object().shape({
  label: Yup.string().required('Label is required'),
  statusApi: Yup.string().required('Status is required'),
  tenant: Yup.string().required('Tenant is required'),
  validTill: Yup.date().required('Expiry date is required'),
});

export const EditAPIKey = ({ show, setShow, apikey }) => {
  const initialValues = {
    id: apikey?.key,
    validTill: moment(apikey?.validTill),
    statusApi: apikey?.status === 'Active' ? true : false,
    tenant: apikey?.tenant,
    label: apikey?.label,
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        heading="Edit API Key"
        submitText="Update"
        handleSubmit={(values) => {
          if (deepEqual(values, initialValues)) {
            setShow(false);
            toast.warn('Nothing was changed!');
          } else {
            delete values['id'];
            const newValues = {
              ...values,
              validTill: values.validTill.toISOString(),
            };
            console.log(newValues);
          }
        }}
      />
    </>
  );
};
