import { Button } from 'components';
import { Formik, Form } from 'formik';
import { createServerImage } from 'lib';

const initialValues = {
  whmcsFileType: 0,
  jsonFile: null,
};

export const WhatToImport = ({ setStep }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        const jsonFile = await createServerImage(values?.jsonFile);
        const final = {
          ...values,
          jsonFile,
        };
        // TODO: Add validation logic here
        console.log(final);
        setStep(3);
      }}
      enableReinitialize
    >
      <Form>
        <div className="w-full rounded-[8px] bg-[#1E1E2D] min-h-[75vh] flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <h6 className="text-white text-[16px] font-medium my-[32px] px-[32px]">
              What To Import
            </h6>
            <div className="px-[32px]">TABLES</div>
          </div>
          {/* Footer Section */}
          <div className="p-[32px] border-t-[1px] border-t-[#323248] border-dashed flex gap-[12px]">
            <Button
              type="secondary"
              htmlType="button"
              onClick={() => setStep(1)}
            >
              Go Back
            </Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
