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

export const AddOrder = ({ show, setShow }) => {
  // const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state?.orders);
  const { clients } = useSelector((state) => state?.users);
  const { products } = useSelector((state) => state?.products);

  // Status
  // ●  Draft - The order is only visible on the admin interface.
  // ● Pending - The order is visible on the end user interface.
  // ● Paid - The invoice has been paid (if applicable).
  // ● Processing - The order is being processed.
  // ● Completed - The order has been setup.
  // ● Accepted - The order has been reviewed and accepted.
  // ● Canceled - The order has been canceled.
  const status = [
    'Draft',
    'Pending',
    'Paid',
    'Processing',
    'Completed',
    'Accepted',
    'Canceled',
  ];

  const fields = [
    {
      type: 'select',
      name: 'clientId',
      placeholder: 'Select Client',
      title: 'Client',
      options: clients?.map((client) => ({
        label: client?.fullName,
        value: client?.id,
      })),
    },
    {
      type: 'select',
      name: 'status',
      placeholder: 'Select Status',
      title: 'Status',
      options: status?.map((el) => ({
        label: el,
        value: el,
      })),
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
      type: 'text',
      name: 'orderNote',
      placeholder: 'Enter Order Notes...',
      title: 'Order Notes',
      options: products?.map((el) => ({
        label: el?.name,
        value: el?.id,
      })),
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
