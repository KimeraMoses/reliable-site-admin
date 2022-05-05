import * as Yup from 'yup';

import { Input, Modal } from 'components';

const initialValues = {
  otp: '',
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
});

export const Email = ({ show, setShow }) => {
  return (
    <Modal
      handleSubmit={(values) => {
        console.log(values);
        setShow(false);
      }}
      show={show}
      setShow={setShow}
      heading="Choose Authentication Method"
      submitText="Submit"
      validationSchema={validationSchema}
      initialValues={initialValues}
      customBody={
        <div className="pb-[32px]">
          {/* Heading */}
          <h6 className="mb-[12px] text-white text-[16px] text-center">
            Email Address
          </h6>
          {/* Desc */}
          <p className="text-[#92928F] text-[14px] text-center mb-[32px]">
            Enter your email address registered with this account and we will
            send you a verification code upon request.
          </p>
          {/* Input */}
          <div className="mt-[32px]">
            <Input name="otp" placeholder="Enter OTP..." />
          </div>
        </div>
      }
    />
  );
};
