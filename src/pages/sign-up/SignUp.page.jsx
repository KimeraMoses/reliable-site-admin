import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from 'store/Actions/AuthActions';
import Data from '../../db.json';

function SignUp() {
  const isLoading = useSelector(state=>state.reg.isLoading)
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    stateProv: "",
    zipCode: "",
    ipAddress: "",
  });

  const registerErrorsOb = {
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    city: "",
    stateProv: "",
    country: "",
    zipCode: "",
    ipAddress: "",
  };
  const [errors, setErrors] = useState(registerErrorsOb);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const registerForm = async (e) => {
    e.preventDefault();
    const registerErrorsObject = { ...registerErrorsOb };
    if (values.username === "") {
      registerErrorsObject.username = "Please Enter Username";
      
    }
    if (values.fullName === "") {
      registerErrorsObject.fullName = "Please Enter Full Name";
      
    }
    if (values.emailAddress === "") {
      registerErrorsObject.emailAddress = "Enter Email";
      
    }
    if (values.password === "") {
      registerErrorsObject.password = "Please Enter Password";
      
    }
    if (values.confirmPassword !== values.password) {
      registerErrorsObject.confirmPassword = "Password Should Match";
      
    }
    if (values.address1 === "") {
      registerErrorsObject.address1 = "Please Enter Address 1 ";
      
    }
    if (values.address2 === "") {
      registerErrorsObject.address2 = "Please Enter Address 2";
      
    }
    if (values.city === "") {
      registerErrorsObject.city = "Please Enter City ";
      
    }
    if (values.stateProv === "") {
      registerErrorsObject.stateProv = "Please Enter State ";
      
    }
    if (values.country === "") {
      registerErrorsObject.country = "Please Enter Country ";
      
    }
    if (values.stateProv === "") {
      registerErrorsObject.stateProv = "Please Enter State ";
      
    }
    if (values.zipCode === "") {
      registerErrorsObject.zipCode = "Please Enter Zip Code ";
      
    }
    if (values.ipAddress === "") {
      registerErrorsObject.ipAddress = "Please Enter Status ";
      
    }
   setErrors(registerErrorsObject);
    try {
      setErrors("");
      await dispatch(signup(values.email, values.password));
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to Login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
        <form onSubmit={registerForm}>
          <div className="mt-4 mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white font-light text-sm"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400   placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="exampleInputEmail1"
              placeholder="Paul Elliott"
              value={values.username}
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="text-red-600 mt-2 flex">{errors.username}</span>
            )}
          </div>
          <div className="mt-4 mb-3">
            <label
              htmlFor="fullName"
              className="form-label text-white font-light text-sm"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="fullName"
              placeholder="Paul Elliott"
              value={values.fullName}
              name="fullName"
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="text-red-600 mt-2 flex">{errors.fullName}</span>
            )}
          </div>
          <div className="mt-4 mb-3">
            <label
              htmlFor="fullName"
              className="form-label text-white font-light text-sm"
            >
              Email address
            </label>
            <input
              type="email"
              className="w-full h-12 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400  placeholder:text-sm px-3  placeholder:font-light focus:outline-none"
              id="fullName"
              placeholder="Paul.Elliott@fakemail.com"
              value={values.emailAddress}
              name="emailAddress"
              onChange={handleChange}
            />
            {errors.emailAddress && (
              <span className="text-red-600 mt-2 flex">
                {errors.emailAddress}
              </span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-white font-light text-sm"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="exampleInputPassword1"
              placeholder="**********"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-600 mt-2 flex">{errors.password}</span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="confirmPassword"
                className="form-label text-white font-light text-sm"
              >
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="confirmPassword"
              placeholder="**********"
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 mt-2 flex">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                htmlFor="ipAddress"
                className="form-label text-white font-light text-sm"
              >
                IP Address
              </label>
            </div>
            <input
              type="text"
              className="w-full h-14 bg-custom-main rounded-md placeholder:text-gray-400 text-gray-400 px-3 placeholder:text-sm placeholder:font-light focus:outline-none"
              id="ipAddress"
              placeholder="253.205.121.39"
              value={values.ipAddress}
              name="ipAddress"
              onChange={handleChange}
            />
            {errors.ipAddress && (
              <span className="text-red-600 mt-2 flex">{errors.ipAddress}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full mb-2 rounded-md h-14 hover:bg-sky-600/[.8] ease-in duration-200"
          >
            {isLoading? "Creating account...": Data.pages.register.createAccountBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
