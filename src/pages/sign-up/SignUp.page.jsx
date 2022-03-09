import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signup } from 'store/Actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { messageNotifications } from 'store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Data from '../../db.json';

const initialValues = {
  username: '',
  fullName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
  ipAddress: '',
};

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  fullName: Yup.string().required('Full Name is required.'),
  emailAddress: Yup.string()
    .required('Email Address is required.')
    .email('Please enter a valid email.'),
  password: Yup.string()
    .required('password is required.')
    .min(6, 'Password must be atleast 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .min(6, 'Password must be atleast 6 characters')
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm Password must matches with Password'
    ),
  ipAddress: Yup.string().required('IP Address is required.'),
});

const fields = [
  { name: 'username', label: 'Username', placeholder: 'paul123456' },
  { name: 'fullName', label: 'Full Name', placeholder: 'Paul Elliot' },
  { name: 'emailAddress', label: 'Email Address', placeholder: 'paul@abz.com' },
  { name: 'password', label: 'Password', placeholder: '**********' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: '**********',
  },
  { name: 'ipAddress', label: 'IP Address', placeholder: '253.205.121.39' },
];

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    ipAddress: '',
  });

  const registerErrorsOb = {
    username: '',
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    ipAddress: '',
  };
  const [errors, setErrors] = useState(registerErrorsOb);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const registerForm = async (e) => {
    e.preventDefault();
    const registerErrorsObject = { ...registerErrorsOb };
    if (values.username === '') {
      setIsLoading(false);
      registerErrorsObject.username = 'Please Enter Username';
    }
    if (values.fullName === '') {
      setIsLoading(false);
      registerErrorsObject.fullName = 'Please Enter Full Name';
    }
    if (values.emailAddress === '') {
      setIsLoading(false);
      registerErrorsObject.emailAddress = 'Enter Email';
    }
    if (values.password === '') {
      setIsLoading(false);
      registerErrorsObject.password = 'Please Enter Password';
    }
    if (values.confirmPassword !== values.password) {
      setIsLoading(false);
      registerErrorsObject.confirmPassword = 'Password Should Match';
    }

    if (values.ipAddress === '') {
      setIsLoading(false);
      registerErrorsObject.ipAddress = 'Please Enter Status ';
    }
    setErrors(registerErrorsObject);
  };

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: '536px' }}>
      <div className="col mx-4 md:mx-auto mb-5">
        <img src="/icon/logo.svg" className="h-20 w-20 mx-auto" alt="" />
      </div>
      <div className=" bg-custom-secondary rounded-lg p-4 md:p-5 ">
        <div className="text-center">
          <h2 className="text-md text-2xl text-white font-normal">
            Create An Admin Account
          </h2>
          <p className="custom-text-light mb-4">
            Fill The Form Below In Order To Create Your Account
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            try {
              setIsLoading(true);
              dispatch(
                signup(
                  values.username,
                  values.password,
                  values.confirmPassword,
                  values.emailAddress,
                  values.fullName,
                  '1',
                  values.ipAddress
                )
              );
              toast.success('Account Created Successfully', {
                ...messageNotifications,
              });
              setIsLoading(false);
              navigate('/admin/sign-in');
            } catch (error) {
              setIsLoading(false);
              toast.error('Error. Check all fields and try again', {
                ...messageNotifications,
              });
            }
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {fields.map((field) => {
                return (
                  <div className="mt-4 mb-3" key={field?.name}>
                    <label
                      htmlFor={field?.name}
                      className="form-label text-white font-light text-sm"
                    >
                      {field?.label}
                    </label>
                    <Field
                      type={
                        field?.name === 'password' ||
                        field?.name === 'confirmPassword'
                          ? 'password'
                          : 'text'
                      }
                      className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 placeholder:text-sm px-3 placeholder:font-light focus:outline-none"
                      id={field?.name}
                      name={field?.name}
                      placeholder={field?.placeholder}
                    />
                    {errors[field?.name] && touched[field?.name] ? (
                      <div className="text-red-600 text-sm">
                        {errors[field?.name]}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
              >
                {isLoading
                  ? 'Creating account...'
                  : Data.pages.register.createAccountBtn}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
