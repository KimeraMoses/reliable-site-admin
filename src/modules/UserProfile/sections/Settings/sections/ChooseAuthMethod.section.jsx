import { useState } from 'react';

import { Modal } from 'components';
import { Mail, Gear } from 'icons';
import { AuthApps } from './AuthApps.section';
import { Email } from './Email.section';

const authMethods = [
  {
    name: 'authApps',
    icon: (fill) => <Gear fill={fill} />,
    title: 'Authenticator Apps',
    description:
      'Get codes from an app like Google Authenticator, Microsoft Authenticator etc.',
  },
  {
    name: 'email',
    icon: (fill) => <Mail fill={fill} />,
    title: 'Email',
    description:
      'We will send you an email if you need to user your backup login method.',
  },
];

export const ChooseAuthMethod = ({ show, setShow }) => {
  const [active, setActive] = useState('authApps');

  // Sub Modals State
  const [authApps, setAuthApps] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <>
      {/* Step 1 */}
      <Modal
        handleSubmit={() => {
          if (active === 'authApps') {
            setAuthApps(true);
          } else if (active === 'email') {
            setEmail(true);
          }
          setShow(false);
        }}
        show={show}
        setShow={setShow}
        heading="Choose Authentication Method"
        submitText="Continue"
        customBody={
          <div className="pb-[32px]">
            <h6 className="mb-[32px] text-[#92928F] text-[14px]">
              In addition to your username and password, you'll have to enter a
              code (delivered via app or SMS) to log into your account.
            </h6>
            {authMethods.map(({ name, icon, title, description }) => (
              <div
                onClick={() => setActive(name)}
                key={name}
                className={`cursor-pointer p-[20px] border-dashed border-1 rounded-[8px] flex items-center gap-[20px] mb-[16px] ${
                  active === name
                    ? 'border-[#3699FF] bg-[#212E48]'
                    : 'border-[#323248] bg-[#1E1E2D]'
                }`}
              >
                <div
                  className={`w-[85px] h-[79px] flex items-center justify-center rounded-[8px] ${
                    active === name ? 'bg-[#3699FF33]' : 'bg-[#15152166]'
                  }`}
                >
                  {active === name ? icon('#3699FF') : icon('#494b74')}
                </div>
                <div>
                  <h3 className="text-white text-[16px] leading-[25px]">
                    {title}
                  </h3>
                  <p className="text-[#92928F] text-[14px] max-w-[333px] leading-[28px]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
      />
      {/* Step 2 (A) */}
      <AuthApps show={authApps} setShow={setAuthApps} />
      {/* Step 2 (B) */}
      <Email show={email} setShow={setEmail} />
    </>
  );
};
