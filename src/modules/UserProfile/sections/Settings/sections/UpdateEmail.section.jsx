import { Modal } from 'components';
import * as Yup from 'yup';

const fields = [
  {
    name: 'email',
    title: 'Enter New Email Address',
    type: 'email',
    placeholder: 'Paul@Fakemail.com',
  },
  {
    name: 'confirmPassword',
    title: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••••••••••',
  },
];

const initialValues = {
  email: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  confirmPassword: Yup.string().required('Password is required'),
});

export const UpdateEmail = ({ show, setShow }) => {
  return (
    <Modal
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={({ email, confirmPassword }) => {
        const finalValues = {
          email,
          password: confirmPassword,
        };
        console.log(finalValues);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
      heading="Update Email"
      submitText="Update Email"
    />
  );
};
