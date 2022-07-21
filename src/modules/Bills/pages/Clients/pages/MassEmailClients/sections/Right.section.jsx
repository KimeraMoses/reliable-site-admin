import { useFormikContext } from 'formik';
import { convertToHTML } from 'draft-convert';
import { convertToRaw } from 'draft-js';

import { EmailBodyInput, ConfigurationEditor, Button } from 'components';
import { axios, getError } from 'lib';
import { toast } from 'react-toastify';
import { useState } from 'react';

export function Right() {
  const [loading, setLoading] = useState(false);
  const { values, setFieldValue, setFieldTouched, touched, errors } =
    useFormikContext();
  return (
    <>
      {/* Header, Footer, and Signature Side */}
      <div className="flex flex-col gap-[20px]">
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Header Content
          </h6>
          <ConfigurationEditor
            editorState={values.headerContentHolder}
            onBlur={() => setFieldTouched('headerContent', true)}
            onEditorStateChange={(state) => {
              setFieldValue('headerContentHolder', state);
              const currentContentAsHTML = convertToHTML(
                state.getCurrentContent()
              );
              if (
                convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                convertToRaw(state.getCurrentContent()).blocks[0].text === ''
              ) {
                setFieldValue('headerContent', '');
              } else {
                setFieldValue('headerContent', currentContentAsHTML);
              }
            }}
          />
          {touched['headerContent'] && errors['headerContent'] && (
            <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
              {errors['headerContent']}
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Footer Content
          </h6>
          <ConfigurationEditor
            editorState={values.footerContentHolder}
            onBlur={() => setFieldTouched('footerConent', true)}
            onEditorStateChange={(state) => {
              setFieldValue('footerContentHolder', state);
              const currentContentAsHTML = convertToHTML(
                state.getCurrentContent()
              );
              if (
                convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                convertToRaw(state.getCurrentContent()).blocks[0].text === ''
              ) {
                setFieldValue('footerConent', '');
              } else {
                setFieldValue('footerConent', currentContentAsHTML);
              }
            }}
          />
          {touched['footerConent'] && errors['footerConent'] && (
            <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
              {errors['footerConent']}
            </div>
          )}
        </div>
        {/* Signature */}
        <div className="bg-[#1E1E2D] rounded-[8px]">
          <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
            Signature Content
          </h6>
          <ConfigurationEditor
            editorState={values.signatureHolder}
            onBlur={() => setFieldTouched('signatureContent', true)}
            onEditorStateChange={(state) => {
              setFieldValue('signatureHolder', state);
              const currentContentAsHTML = convertToHTML(
                state.getCurrentContent()
              );
              if (
                convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                convertToRaw(state.getCurrentContent()).blocks[0].text === ''
              ) {
                setFieldValue('signatureContent', '');
              } else {
                setFieldValue('signatureContent', currentContentAsHTML);
              }
            }}
          />
          {touched['signatureContent'] && errors['signatureContent'] && (
            <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
              {errors['signatureContent']}
            </div>
          )}
        </div>
        {/* Email Body Side */}
        <div className="flex flex-col gap-[20px]">
          <div className="bg-[#1E1E2D] rounded-[8px]">
            <h6 className="text-white font-medium p-[32px]">Email Body</h6>
            {/* Other Inputs */}
            <div className="flex flex-col gap-[2px]">
              <EmailBodyInput
                name="clientName"
                label="Client Name"
                placeholder="[[fullName]]"
                touched={touched}
                errors={errors}
                type="readOnly"
              />
              <EmailBodyInput
                name="company"
                label="Company"
                placeholder="[[company]]"
                touched={touched}
                errors={errors}
                type="readOnly"
              />
              <EmailBodyInput
                name="address"
                label="Address"
                placeholder="[[address]]"
                touched={touched}
                errors={errors}
                type="readOnly"
              />
            </div>
            <ConfigurationEditor
              editorState={values?.bodyHolder}
              onBlur={() => setFieldTouched('emailBody', true)}
              onEditorStateChange={(state) => {
                setFieldValue('bodyHolder', state);
                const currentContentAsHTML = convertToHTML(
                  state.getCurrentContent()
                );
                if (
                  convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                  convertToRaw(state.getCurrentContent()).blocks[0].text === ''
                ) {
                  setFieldValue('emailBody', '');
                } else {
                  setFieldValue('emailBody', currentContentAsHTML);
                }
              }}
            />
            {touched['emailBody'] && errors['emailBody'] && (
              <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                {errors['emailBody']}
              </div>
            )}
            <div className="flex flex-col gap-[2px]">
              <EmailBodyInput
                name="numberOfEmails"
                label="Number of Email"
                placeholder="[numbers]"
                touched={touched}
                errors={errors}
                type="number"
                darkBg
              />
              <EmailBodyInput
                name="intervalInSeconds"
                label="Interval In Seconds"
                placeholder="[seconds]"
                touched={touched}
                errors={errors}
                type="number"
                darkBg
              />
            </div>
            <div className="p-[32px]">
              <Button
                onClick={async () => {
                  setLoading(true);
                  const finalVaues = {
                    productIds: values?.productIds,
                    clientIds: values?.clientIds,
                    headerContent: values?.headerContent,
                    footerConent: values?.footerContent,
                    signatureContent: values?.signatureContent,
                    emailBody: values?.emailBody,
                    numberOfEmails: values?.numberOfEmails,
                    intervalInSeconds: values?.intervalInSeconds,
                    smtpConfigId: values?.smtpConfigId,
                    name: values?.name,
                    emailAddress: values?.emailAddress,
                    companyAddress: values?.companyAddress,
                    cssStyle: values?.cssStyle,
                  };
                  try {
                    await axios.post('/api/v1/admin/massemails', finalVaues, {
                      modulename: 'Users',
                      moduleactionname: 'Create',
                    });
                    toast.success('Email Sent Successfully!');
                  } catch (e) {
                    toast.error(getError(e));
                  }
                  setLoading(false);
                }}
                htmlType="button"
                loading={loading}
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
