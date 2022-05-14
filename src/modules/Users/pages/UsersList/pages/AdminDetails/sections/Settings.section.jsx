import { Formik, Form, Field } from 'formik';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserSettingsById } from 'store';

export const Settings = () => {
  const { t } = useTranslation('/Users/ns');

  const { user, loading, userSettings } = useSelector((state) => state?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserSettingsById(user?.id));
    }
  }, [user]);

  // console.log(userSettings);

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
    { label: t('adminStatus'), name: 'adminStatus', type: 'switch' },
    { label: 'Request Per IP Override', name: 'reqPerIP', type: 'input' },
    {
      label: t('IPRestrictionOverride'),
      name: 'IPRestrictionOverride',
      type: 'input',
    },
    { label: t('apiKeyLimit'), name: 'apiKeyLimit', type: 'input' },
    {
      label: t('apiKeyInterval'),
      name: 'apiKeyInterval',
      type: 'input',
    },
    {
      label: t('ipAddress'),
      name: 'ipAddress',
      type: 'input',
    },
    { label: t('suspensionDate'), name: 'suspensionDate', type: 'input' },
  ];

  return (
    <div className="bg-[#1E1E2D] mt-[20px] rounded-[8px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
        {t('settings')}
      </h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
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
              {t('discard')}
            </button>
            <button
              type="submit"
              className="bg-[#3699FF] text-white rounded-[8px] py-[12px] px-[24px]"
            >
              {t('saveChanges')}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
