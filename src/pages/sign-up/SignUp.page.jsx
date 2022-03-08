import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signup } from "store/Actions/AuthActions";
import Data from "../../db.json";
import { useNavigate } from "react-router-dom";
import { messageNotifications } from "store";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    ipAddress: "",
  });

  const registerErrorsOb = {
    username: "",
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
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
      setIsLoading(false);
      registerErrorsObject.username = "Please Enter Username";
    }
    if (values.fullName === "") {
      setIsLoading(false);
      registerErrorsObject.fullName = "Please Enter Full Name";
    }
    if (values.emailAddress === "") {
      setIsLoading(false);
      registerErrorsObject.emailAddress = "Enter Email";
    }
    if (values.password === "") {
      setIsLoading(false);
      registerErrorsObject.password = "Please Enter Password";
    }
    if (values.confirmPassword !== values.password) {
      setIsLoading(false);
      registerErrorsObject.confirmPassword = "Password Should Match";
    }

    if (values.ipAddress === "") {
      setIsLoading(false);
      registerErrorsObject.ipAddress = "Please Enter Status ";
    }
    setErrors(registerErrorsObject);
    try {
      setErrors("");
      await dispatch(
        signup(
          values.username,
          values.password,
          values.confirmPassword,
          values.emailAddress,
          values.fullName,
          "1",
          values.ipAddress
        )
      );
      toast.success("Account Created Successfully", {...messageNotifications });
      navigate("/admin/sign-in");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error. Check all fields and try again", {...messageNotifications});

    }
  };

  return (
    <div className="w-screen mx-auto my-5 " style={{ maxWidth: "536px" }}>
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
            {isLoading
              ? "Creating account..."
              : Data.pages.register.createAccountBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
