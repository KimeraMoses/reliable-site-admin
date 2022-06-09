import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentGateway } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'name',
    placeholder: 'Enter Category Name',
    title: 'Category Name',
  },
];

const initialValues = {
  name: '',
  apiKey: '',
  status: true,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
  apiKey: Yup.string().required('This field is required!'),
  status: Yup.boolean().required('This field is required!'),
});

export const AddCategory = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.paymentGateways);
  return (
    <Modal
      heading="Add Parent Category"
      submitText="Add Category"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={() => {}}
    />
  );
};
