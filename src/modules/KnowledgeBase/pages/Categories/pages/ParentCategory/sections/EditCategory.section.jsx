import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { updateArticleCategory } from 'store';
import * as Yup from 'yup';

const fields = [
  {
    type: 'input',
    name: 'name',
    placeholder: 'Enter Category Name',
    title: 'Category Name',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
});

export const EditCategory = ({ show, setShow, id }) => {
  const dispatch = useDispatch();
  const { articleCategory, loading } = useSelector(
    (state) => state?.articleCategories
  );

  const initialValues = {
    name: articleCategory?.name,
  };

  return (
    <Modal
      heading="Edit Parent Category"
      submitText="Edit Category"
      show={show}
      loading={loading}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        const newValues = {
          ...values,
          categoryType: 1,
        };
        await dispatch(updateArticleCategory({ id, data: newValues }));
        setShow(false);
      }}
    />
  );
};
