import * as Yup from 'yup';

import { Input, Modal } from 'components';
import { Info } from 'icons';

const data = {
  qr: 'https://www.shift4shop.com/lp/qr-code-generator/qrcodes/c823cefe10d24fbf376d40d26199e862.png',
  code: 'KBSS3QDAAFUMCBY63YCKI5WSSVACUMPN',
};

const initialValues = {
  code: '',
};

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
});

export const AuthApps = ({ show, setShow }) => {
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
            Authenticator Apps
          </h6>
          {/* Desc */}
          <p className="text-[#92928F] text-[14px] text-center mb-[32px]">
            Get codes from an app like Google Authenticator, Microsoft
            Authenticator etc.
          </p>
          {/* QR Image */}
          <div className="mb-[32px] flex items-center justify-center">
            <img
              src={data?.qr}
              alt="QR"
              className="rounded-[8px] h-[200px] w-[200px] object-cover"
            />
          </div>
          {/* Additional Info */}
          <div className="rounded-[8px] p-[20px] bg-[#392F28] border-dashed border-1 border-[#FFA800] gap-[20px] flex flex-col items-center">
            {/* Info Icon Box */}
            <div className="rounded-[8px] bg-[#FFA80033] w-[79px] h-[79px] flex items-center justify-center">
              <Info fill="#ffa800" />
            </div>
            {/* Description */}
            <p className="text-[#92928F] text-[14px] text-center">
              If you having trouble using the QR code, select manual entry on
              your app, and enter your username and the code:
            </p>
            <p className="text-white text-[16px] text-center font-medium">
              {data?.code}
            </p>
            {/* Input */}
          </div>
          <div className="mt-[32px]">
            <Input name="code" placeholder="Enter Authentication Code..." />
          </div>
        </div>
      }
    />
  );
};
