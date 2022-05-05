import { Button } from 'components';
import { useState } from 'react';
import { UpdateEmail } from './sections';

const user = {
  fullName: 'Paul Elliot',
  email: 'Paul@Fakemail.com',
};

export const SigninMethods = () => {
  // States to manage the modals
  const [updateEmail, setUpdateEmail] = useState(false);
  // Render
  return (
    <div className="bg-[#1E1E2D] rounded-[8px] mt-[20px]">
      {/* Heading */}
      <h3 className="text-white text-[16px] p-[32px]">Sign-In Methods</h3>
      {/* Divider */}
      <hr
        className="w-full border-t-[2px] border-t-[#474761] border-dashed"
        style={{ height: '0px' }}
      />
      {/* Fields */}
      <div className="p-[32px]">
        {/* Email Edit Section */}
        <div className="pb-[20px] flex items-center justify-between">
          <div>
            <p className="text-white text-[14px]">Email Address</p>
            <p className="text-[#92928F] text-[14px]">{user?.email}</p>
          </div>
          <div>
            <Button type="secondary" onClick={() => setUpdateEmail(true)}>
              Change Email
            </Button>
          </div>
        </div>
        {/* Divider */}
        <hr
          className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
          style={{ height: '0px' }}
        />
        {/* Password Edit Section */}
        <div className="pb-[32px] flex items-center justify-between">
          <div>
            <p className="text-white text-[14px]">Password</p>
            <p className="text-[#92928F] text-[14px]">••••••••••••••••</p>
          </div>
          <div>
            <Button type="secondary">Reset Password</Button>
          </div>
        </div>
        {/* MFA Section */}
        <div className="p-[20px] bg-[#212E48] border-1 border-[#3699FF] border-dashed rounded-[8px] flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            {/* TODO: Add Icon After Discussion With Designer */}
            <div className="h-[51px] w-[51px] bg-[#3699FF33] rounded-[8px] flex items-center justify-center"></div>
            <div>
              <p className="text-white text-[14px]">Secure Your Account</p>
              <p className="text-[#92928F] text-[14px]">
                Two-factor authentication adds an extra layer of security to
                your account. To log in, in addition you'll need to provide a 6
                digit code
              </p>
            </div>
          </div>
          <div>
            <Button>Enable</Button>
          </div>
        </div>
      </div>
      {/* Modals */}
      <UpdateEmail show={updateEmail} setShow={setUpdateEmail} />
    </div>
  );
};
