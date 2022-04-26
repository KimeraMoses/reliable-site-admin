import { Formik, Form, Field } from 'formik';
import { Switch } from 'antd';

export const Settings = () => {
  const initialValues = {
    adminStatus: true,
    reqPerIP: 20,
    IPRestrictionOverride: 3600,
    apiKeyLimit: 20,
    apiKeyInterval: 3600,
    ipAddress: '253.205.121.39',
    suspensionDate: '1st April, 2022',
  };

  const fields = [
    { label: 'Admin Status', name: 'adminStatus', type: 'switch' },
    { label: 'Request Per IP Override', name: 'reqPerIP', type: 'input' },
    {
      label: 'IP Restriction Interval Override In Seconds',
      name: 'IPRestrictionOverride',
      type: 'input',
    },
    { label: 'API Key Limit Override', name: 'apiKeyLimit', type: 'input' },
    {
      label: 'API Key Interval Override In seconds',
      name: 'apiKeyInterval',
      type: 'input',
    },
    {
      label: 'Restrict Access To IP Address',
      name: 'ipAddress',
      type: 'input',
    },
    { label: 'Extend Suspension Date', name: 'suspensionDate', type: 'input' },
  ];

  return (
    <div className="bg-[#1E1E2D] mt-[20px] rounded-[8px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">Settings</h6>
      <hr className="border-dashed border-t-[1px] border-[#323248] mt-[32px] mb-[32px]" />
      {/* FORM ROW */}
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        <Form className="pb-[32px]">
          <div className="grid grid-cols-3 p-[32px] gap-[20px] items-end">
            {fields?.map((el) => {
              return (
                <>
                  {el?.type === 'switch' ? (
                    <Field name={el?.name}>
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                        <div className="w-full">
                          <div className="text-white mb-[12px] text-[14px]">
                            {el?.label}
                          </div>
                          <div className="flex items-center justify-between w-full h-[52px] px-[16px] py-[0px] bg-[#171723] text-[#92928F] rounded-[8px]">
                            <div className="text-[#92928F]">
                              {field?.value ? 'Enabled' : 'Disabled'}
                            </div>
                            <Switch
                              checked={field?.value}
                              onChange={(e) => {
                                setFieldValue(el?.name, e);
                              }}
                            />
                          </div>
                          {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      )}
                    </Field>
                  ) : (
                    <Field name={el?.name}>
                      {({
                        field, // { name, value, onChange, onBlur }
                        meta,
                      }) => (
                        <div className="w-full">
                          <div className="text-white mb-[12px] text-[14px]">
                            {el?.label}
                          </div>
                          <input
                            type={el?.type}
                            {...field}
                            className="w-full h-[52px] px-[16px] py-[0px] bg-[#171723] text-[#92928F] rounded-[8px]"
                          />
                          {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      )}
                    </Field>
                  )}
                </>
              );
            })}
          </div>
          <div className="flex items-center gap-[10px] px-[32px]">
            <button
              type="button"
              className="bg-[#323248] text-white rounded-[8px] py-[12px] px-[24px]"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#3699FF] text-white rounded-[8px] py-[12px] px-[24px]"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
