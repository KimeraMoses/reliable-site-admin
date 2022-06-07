import * as Yup from 'yup';
import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from 'store';

const addSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const initialValues = {
  name: '',
};

export const Add = ({ show, setShow }) => {
  const { categories } = useSelector((state) => state?.categories);
  const { loading } = useSelector((state) => state?.products);
  const fields = [
    {
      name: 'name',
      title: 'Name',
      type: 'text',
      placeholder: 'Enter Product Name',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      placeholder: 'Enter Product Description',
    },
    // {
    //   name: 'img',
    //   title: 'Thumbnail',
    //   type: 'image',
    //   placeholder: 'Select Thumbnail',
    // },
    {
      name: 'productCategories',
      title: 'Category',
      type: 'select',
      placeholder: 'Select Category',
      options: categories?.map((category) => ({
        label: category?.name,
        value: category?.id,
      })),
    },
    {
      name: 'paymentType',
      title: 'Payment Type',
      type: 'select',
      placeholder: 'Select Payment Type',
      options: [
        { label: 'One Time', value: 0 },
        { label: 'Monthly', value: 1 },
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'select',
      placeholder: 'Select Product Status',
      options: [
        { label: 'Pending', value: 0 },
        { label: 'Confirmed', value: 1 },
        { label: 'Cancelled', value: 2 },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'text',
      placeholder: 'Enter Comma Separated Tags',
    },
  ];

  const dispatch = useDispatch();
  return (
    <Modal
      show={show}
      setShow={setShow}
      heading="Add New Product"
      submitText="Add New Product"
      handleSubmit={async (values) => {
        const newVal = {
          ...values,
          paymentType: Number(values.paymentType),
          status: Number(values.status),
          productCategories: [values.productCategories],
        };
        await dispatch(createProduct(newVal));
      }}
      loading={loading}
      fields={fields}
      validationSchema={addSchema}
      initialValues={initialValues}
    />
  );
};
