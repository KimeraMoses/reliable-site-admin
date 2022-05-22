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
      heading="Delete Configuration"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to delete this configuration? This action is
          permanent and can not be undone.
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      submitText="Delete Configuration"
      handleSubmit={(values) => {
        console.log(values?.id);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
