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
          Are you sure you want to delete this configuration?
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      submitText="Delete"
      handleSubmit={(values) => {
        console.log(values?.id);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
