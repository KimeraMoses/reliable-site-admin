import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addWebhook } from 'store/Actions/webhooks';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'webHookUrl',
    placeholder: 'Enter Web Hook URL',
    title: 'Web Hook URL',
  },
  {
    type: 'input',
    name: 'secret',
    placeholder: 'Enter Webhook Secret',
    title: 'Secret',
  },
  {
    type: 'switch',
    name: 'isActive',
    title: 'Status',
  },
  {
    type: 'input',
    name: 'contentType',
    placeholder: 'Enter Content Type',
    title: 'Content Type',
  },
  {
    type: 'multiselect',
    name: 'hookEvents',
    placeholder: 'Select Hook Events',
    title: 'Hook Events',
    // [ 0 = hook, 1 = file, 2 = note, 3 = project, 4 = milestone ]]
    options: ['Hook', 'File', 'Note', 'Project', 'Milestone']?.map(
      (option, idx) => ({
        label: option,
        value: idx,
      })
    ),
  },
];

const initialValues = {
  webHookUrl: '',
  secret: '',
  contentType: '',
  hookEvents: [],
  isActive: true,
};

const validationSchema = Yup.object().shape({
  webHookUrl: Yup.string().required('This field is required!'),
  secret: Yup.string().required('This field is required!'),
  contentType: Yup.string().required('This field is required!'),
});

export const AddWebhook = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.webhooks);
  return (
    <Modal
      heading="Add Webhook"
      submitText="Add Webhook"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        await dispatch(addWebhook({ data: values }));
        setShow(false);
      }}
    />
  );
};
