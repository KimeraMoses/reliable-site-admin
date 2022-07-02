import { Modal } from 'components';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
  // name: '',
  // apiKey: '',
  // status: true,
};

const validationSchema = Yup.object().shape({
  // name: Yup.string().required('This field is required!'),
  // apiKey: Yup.string().required('This field is required!'),
  // status: Yup.boolean().required('This field is required!'),
});

export const FollowUp = ({ show, setShow }) => {
  const { users } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);

  const fields = [
    {
      type: 'date',
      name: 'followUpDate',
      placeholder: 'Select a date to follow up',
      title: 'Follow Up Date',
    },
    {
      type: 'select',
      name: 'adminId',
      placeholder: 'Select Admin',
      options: users?.map((user) => ({
        label: user?.fullName ? user?.fullName : user?.email,
        value: user?.id,
      })),
      title: 'Admin',
    },
    {
      type: 'select',
      name: 'departmentId',
      placeholder: 'Select Department',
      options: departments?.map((dept) => ({
        label: dept?.name,
        value: dept?.id,
      })),
      title: 'Department',
    },
    {
      type: 'select',
      name: 'priority',
      placeholder: 'Priority',
      options: [
        { name: 'Urgent', value: 0 },
        { name: 'Not-Urgent', value: 1 },
      ]?.map((priority) => ({
        label: priority?.name,
        value: priority?.id,
      })),
      title: 'Priority',
    },
    {
      type: 'switch',
      name: 'pinned',
      title: 'Pin Ticket',
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
      heading="Follow Up"
      submitText="Follow Up"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        setShow(false);
      }}
    />
  );
};
