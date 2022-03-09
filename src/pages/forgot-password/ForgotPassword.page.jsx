import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { messageNotifications } from 'store';
import { forgotPassword } from 'store/Actions/AuthActions';
import Data from '../../db.json';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Please enter a valid email!'),
});

function ForgotPassword() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    if (name === 'email') {
      setError('');
    }
    setError('');
  };

  const passwordResetHandler = async (event) => {
    event.preventDefault();
    if (values.email.length < 1) {
      setIsLoading(false);
      return setError('A valid email is required to reset password');
    }
    if (values.email !== 'undefined') {
      setError('');
      const pattern =
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

      if (!pattern.test(values.email)) {
        setIsLoading(false);
        return setError('Please enter valid email address.');
      }
    }
    try {
      setIsLoading(true);
      setError('');
      await dispatch(forgotPassword(values.email));
      localStorage.setItem('userEmail', values.email);
      setValues({ email: '' });
      toast.success('A Link has been sent to your email to reset password', {
        ...messageNotifications,
      });
      setIsLoading(false);
    } catch (err) {
      toast.error('Failed to reset Password', { ...messageNotifications });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-content-center">
      <div className="col" style={{ maxWidth: '536px' }}>
        <div className="flex items-center justify-center mb-5">
          <img src="/icon/logo.svg" alt="" className="h-20 w-20" />
        </div>
        <div className="col mx-4 md:mx-auto bg-custom-secondary rounded-lg p-8 ">
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 className="text-md text-2xl text-white font-normal">
              {Data.pages.forgotPassword.title}
            </h2>
            <p className="custom-text-light">
              {Data.pages.forgotPassword.subTitle}
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                setIsLoading(true);
                setError('');
                await dispatch(forgotPassword(values.email));
                localStorage.setItem('userEmail', values.email);
                setValues({ email: '' });
                toast.success(
                  'A Link has been sent to your email to reset password',
                  {
                    ...messageNotifications,
                  }
                );
                setIsLoading(false);
              } catch (err) {
                toast.error('Failed to reset Password', {
                  ...messageNotifications,
                });
                setIsLoading(false);
              }
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className="mt-4 md:mb-8">
                    <label
                      htmlFor="forgotPassword"
                      className="form-label text-white font-light text-sm"
                    >
                      {Data.pages.forgotPassword.emailAddress}
                    </label>
                    <Field
                      id="forgotPassword"
                      type="email"
                      name="email"
                      className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 focus:outline-none placeholder:text-sm px-3  placeholder:font-light"
                      placeholder={Data.pages.forgotPassword.placeholder}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600 text-sm">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="flex mt-4 md:mt-5">
                    <button
                      type="button"
                      className="bg-blue-900/[.3] w-full mb-2 rounded-md h-12 text-blue-500 hover:bg-blue-900/[.1] ease-in duration-200"
                      onClick={() => navigate('/admin/sign-in')}
                    >
                      {Data.pages.forgotPassword.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 w-full h-12 rounded-md text-white font-light ml-2 ease-in duration-200"
                    >
                      {isLoading
                        ? 'Sending...'
                        : Data.pages.forgotPassword.submitBtn}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <form onSubmit={passwordResetHandler} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
