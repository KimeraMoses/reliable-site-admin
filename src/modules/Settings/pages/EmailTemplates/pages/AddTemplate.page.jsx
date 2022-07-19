import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { Input, ConfigurationEditor, Button, EmailBodyInput } from 'components';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addEmailTemplate } from 'store';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  smtpConfigurationId: Yup.string().required('Configuration is required'),
  status: Yup.boolean().required('Status is required'),
  isSystem: Yup.boolean().required('This field is required'),
  emailTemplateType: Yup.number().required('This field is required'),
  body: Yup.string().required('Email body is required'),
});

export const AddTemplate = () => {
  const { smtps } = useSelector((state) => state?.smtps);
  const { user } = useSelector((state) => state?.auth);
  const { loading } = useSelector((state) => state?.emailTemplates);

  const smtpOptions = smtps.map((smtp) => {
    return {
      value: smtp.id,
      label: smtp.host,
    };
  });

  const initialValues = {
    createdBy: user?.id,
    subject: '',
    body: '',
    tenant: 'Admin',
    status: true,
    smtpConfigurationId: smtpOptions[0]?.value || '',
    isSystem: false,
    emailTemplateType: 0,
    bodyHolder: EditorState.createEmpty(),
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await dispatch(
          addEmailTemplate({
            data: {
              ...values,
              emailTemplateType: Number(values?.emailTemplateType),
            },
          })
        );
        navigate('/admin/dashboard/settings/email-templates');
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Spin spinning={loading}>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] px-[32px] py-[40px]">
                {/* SMTP Configuration Side */}
                <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
                  <h6 className="text-white mb-[32px]">New Template</h6>
                  <div className="flex flex-col gap-[20px]">
                    <Input
                      name="subject"
                      label="Subject"
                      placeholder="Email Subject"
                    />
                    <Input
                      name="smtpConfigurationId"
                      label="SMTP Configuration"
                      placeholder="Select SMTP Configuration"
                      type="select"
                      options={smtpOptions}
                    />
                    <Input
                      name="emailTemplateType"
                      label="Template Type"
                      placeholder="Select Template Type"
                      type="select"
                      // [ 0 = General, 1 = EmailConfirmation, 2 = EmailOTP, 3 = ProductCancellation, 4 = ResetPassword, 5 = TicketUpdate ]
                      options={[
                        'General',
                        'Email Confirmation',
                        'Email OTP',
                        'Product Cancellation',
                        'Reset Password',
                        'Ticket Update',
                      ].map((el, idx) => {
                        return {
                          value: idx,
                          label: el,
                        };
                      })}
                    />
                    <Input name="status" label="Status" type="switch" />
                    <Input
                      name="isSystem"
                      label="System Template"
                      type="switch"
                    />
                  </div>
                  <Button className="mt-[32px]" htmlType="submit">
                    Add New Template
                  </Button>
                </div>
                {/* Email Body Side */}
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px]">
                      Email Body
                    </h6>
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
                      editorState={values.bodyHolder}
                      onBlur={() => setFieldTouched('body', true)}
                      onEditorStateChange={(state) => {
                        setFieldValue('bodyHolder', state);
                        const currentContentAsHTML = convertToHTML(
                          state.getCurrentContent()
                        );
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
                        ) {
                          setFieldValue('body', '');
                        } else {
                          setFieldValue('body', currentContentAsHTML);
                        }
                      }}
                    />
                    {touched['body'] && errors['body'] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors['body']}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
};
