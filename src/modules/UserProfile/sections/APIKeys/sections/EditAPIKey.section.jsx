import * as Yup from 'yup';
import moment from 'moment';
import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { updateAPIKey } from 'store';
import { getAPIKeysByUID } from 'store';

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

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { loading } = useSelector((state) => state?.apiKeys);

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues}
        loading={loading}
        validationSchema={validationSchema}
        heading="Edit API Key"
        submitText="Update"
        handleSubmit={async (values) => {
          const keyId = values?.id;
          delete values['id'];
          const newValues = {
            ...values,
            validTill: values.validTill.toISOString(),
          };
          await dispatch(updateAPIKey(keyId, newValues));
          await dispatch(getAPIKeysByUID(user?.id));
          setShow(false);
        }}
      />
    </>
  );
};
