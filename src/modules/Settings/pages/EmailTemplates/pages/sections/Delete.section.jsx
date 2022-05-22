import { Modal } from 'components';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Delete = ({ show, setShow, record }) => {
  const initialValues = {
    id: record?.id,
  };
  return (
    <Modal
      heading="Delete Email Template"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this email template? This action is
          permanent and can not be undone.
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      submitText="Delete Template"
      handleSubmit={(values) => {
        console.log(values?.id);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
