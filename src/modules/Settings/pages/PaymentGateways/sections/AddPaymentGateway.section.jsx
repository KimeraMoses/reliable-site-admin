import { Modal } from 'components';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'gatewayName',
    placeholder: 'Enter Payment Gateway Name',
    title: 'Payment Gateway',
  },
  {
    type: 'input',
    name: 'apiKey',
    placeholder: 'Enter Payment Gateway API Key',
    title: 'API Key',
  },
  {
    type: 'switch',
    name: 'status',
    title: 'Status',
  },
];

const initialValues = {
  gatewayName: '',
  apiKey: '',
  status: true,
};

const validationSchema = Yup.object().shape({
  gatewayName: Yup.string().required('This field is required!'),
  apiKey: Yup.string().required('This field is required!'),
  status: Yup.boolean().required('This field is required!'),
});

export const AddPaymentGateway = ({ show, setShow }) => {
  return (
    <Modal
      heading="Add Payment Gateway"
      submitText="Add Payment Gateway"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={(values) => console.log(values)}
    />
  );
};
