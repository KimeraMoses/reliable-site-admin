import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const fields = [
  {
    type: 'select',
    name: 'icon',
    title: 'Category Icon',
    options: [
      {
        label: () => {
          return <img src="/icon/category-box.svg" alt="article title" />;
        },
        value: '1',
      },
      { label: 'Category 2', value: '2' },
    ],
  },
  {
    type: 'input',
    name: 'name',
    placeholder: 'Enter Category Name',
    title: 'Category Name',
  },

  {
    type: 'select',
    name: 'parentcategory',
    options: [
      { label: 'parent category 1 ', value: '1' },
      { label: 'parent category 2 ', value: '3' },

      { label: 'Category 2', value: '2' },
    ],
    title: 'Select Parent Category',
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

export const AddChildCategory = ({ show, setShow }) => {
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
