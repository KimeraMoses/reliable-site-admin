import { Modal } from 'components';
// import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {};

const validationSchema = Yup.object().shape({});

export const Priority = ({ show, setShow, id }) => {
  // const { users } = useSelector((state) => state?.users);

  const fields = [
    {
      type: 'select',
      name: 'priority',
      placeholder: 'Select Priority',
      options: ['Urgent', 'Not-Urgent'].map((el) => ({
        label: el,
        value: el,
      })),
      title: 'Priority',
    },
    {
      type: 'textarea',
      name: 'comment',
      title: 'Comment',
      placeholder: 'Enter Comment Here...',
    },
  ];
  return (
    <Modal
      heading="Set Priority"
      submitText="Set Priority"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        setShow(false);
        console.log(id);
      }}
    />
  );
};
