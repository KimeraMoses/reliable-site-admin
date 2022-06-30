import { Modal } from 'components';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

// const initialValues = {
//   name: '',
//   apiKey: '',
//   status: true,
// };

const validationSchema = Yup.object().shape({
  // name: Yup.string().required('This field is required!'),
  // apiKey: Yup.string().required('This field is required!'),
  // status: Yup.boolean().required('This field is required!'),
});

export const OrderTemplate = ({ show, setShow }) => {
  // const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state?.orders);
  const { products } = useSelector((state) => state?.products);

  const allLineItems = products?.map((product) => {
    return [...product?.productLineItems];
  });
  console.log(allLineItems);

  const fields = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Enter Template Name...',
      title: 'Template Name',
    },
    {
      type: 'multiselect',
      mode: 'multiple',
      name: 'product',
      placeholder: 'Select Product',
      title: 'Product/Service',
      options: products?.map((el) => ({
        label: el?.name,
        value: el?.id,
      })),
    },
    {
      type: 'multiselect',
      mode: 'multiple',
      name: 'lineItems',
      placeholder: 'Select Line Items',
      title: 'Line Items',
    },
  ];

  return (
    <Modal
      heading="Add Order"
      submitText="Add Order"
      show={show}
      // loading={loading}
      setShow={setShow}
      fields={fields}
      // initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        console.log(values);
        setShow(false);
      }}
    />
  );
};
