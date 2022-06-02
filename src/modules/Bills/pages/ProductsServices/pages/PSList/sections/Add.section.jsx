import * as Yup from 'yup';
import { Modal } from 'components';

const fields = [
  {
    name: 'name',
    title: 'Name',
    type: 'text',
    placeholder: 'Enter Product Name',
  },
];

const addSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const initialValues = {
  name: '',
};

export const Add = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      setShow={setShow}
      heading="Add New Product"
      submitText="Add New Product"
      fields={fields}
      validationSchema={addSchema}
      initialValues={initialValues}
    />
  );
};
