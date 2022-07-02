import { Modal } from 'components';
import * as Yup from 'yup';

const initialValues = {};

const validationSchema = Yup.object().shape({});

export const Status = ({ show, setShow, id }) => {
  const fields = [
    {
      type: 'select',
      name: 'status',
      placeholder: 'Select Status',
      options: ['Active', 'Waiting', 'Closed', 'Closed and Locked']?.map(
        (el) => ({
          label: el,
          value: el,
        })
      ),
      title: 'Status',
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
      heading="Set Status"
      submitText="Set Status"
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
