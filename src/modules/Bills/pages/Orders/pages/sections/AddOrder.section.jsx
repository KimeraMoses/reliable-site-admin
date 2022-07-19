import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  productIds: Yup.array().of(Yup.string()).required('This field is required!'),
  orderForClientId: Yup.string().required('This field is required!'),
  customerIP: Yup.string().required('This field is required!'),
  orderStatus: Yup.number().required('This field is required!'),
  notes: Yup.string().required('This field is required!'),
});

export const AddOrder = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state?.users);
  const { products } = useSelector((state) => state?.products);
  const { orderTemplates, loading } = useSelector((state) => state?.orders);

  const status = [
    'Draft',
    'Pending',
    'Paid',
    'Processing',
    'Accepted',
    'Completed',
    'Canceled',
  ];

  const fields = [
    {
      type: 'select',
      name: 'orderTemplateId',
      placeholder: 'Choose Template',
      title: 'Template',
      options: orderTemplates?.map((template) => ({
        label: template?.templateName,
        value: template?.id,
      })),
    },
    {
      type: 'select',
      name: 'orderForClientId',
      placeholder: 'Select Client',
      title: 'Client',
      options: clients?.map((client) => ({
        label: client?.fullName,
        value: client?.id,
      })),
    },
    {
      type: 'select',
      name: 'orderStatus',
      placeholder: 'Select Status',
      title: 'Status',
      options: status?.map((el, idx) => ({
        label: el,
        value: idx,
      })),
    },
    {
      type: 'multiselect',
      mode: 'multiple',
      name: 'productIds',
      placeholder: 'Select Products',
      title: 'Products/Services',
      options: products?.map((el) => ({
        label: el?.name,
        value: el?.id,
      })),
    },
    {
      type: 'text',
      name: 'customerIP',
      placeholder: 'Enter Customer IP...',
      title: 'Customer IP',
    },
    {
      type: 'text',
      name: 'notes',
      placeholder: 'Enter Order Notes...',
      title: 'Order Notes',
    },
  ];

  const initialValues = {
    productIds: [],
    orderForClientId: '',
    customerIP: '',
    orderStatus: 0,
    notes: '',
    orderTemplateId: orderTemplates[0]?.id,
  };

  return (
    <Modal
      heading="Add Order"
      submitText="Add Order"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        await dispatch(
          createOrder({
            data: {
              ...values,
              orderStatus: Number(values?.orderStatus),
              tenant: 'Admin',
            },
          })
        );
        setShow(false);
      }}
    />
  );
};
