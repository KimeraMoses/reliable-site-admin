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
  // clientName: Yup.string().required('Client name is required'),
  // company: Yup.string().required('Company is required'),
  // address: Yup.string().required('Address is required'),
  body: Yup.string().required('Email body is required'),
});

// const ConfigurationEditor = ({ editorState, onEditorStateChange, onBlur }) => {
//   return (
//     <div className="configuration-editor">
//       <div className="configuration-editor__container">
//         <SMTPEditor
//           editorState={editorState}
//           wrapperClassName="configuration-editor__container-wrapper"
//           editorClassName="configuration-editor__container-editor"
//           onChange={onEditorStateChange}
//           placeholder="Start typing here..."
//           onBlur={onBlur}
//         />
//       </div>
//     </div>
//   );
// };

// const EmailBodyInput = ({ touched, errors, name, placeholder, label }) => {
//   return (
//     <div className="flex gap-[20px] bg-[#28283a] items-center">
//       <h6 className="px-[32px] w-[20%] text-white whitespace-nowrap">
//         {label}
//       </h6>
//       <Field
//         name={name}
//         placeholder={placeholder}
//         className="h-[52px] w-[60%] text-[#92928f] placeholder:text-[#92928f] bg-[#28283a] focus-visible:outline-none"
//       />
//       {touched[name] && errors[name] && (
//         <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
//           {errors[name]}
//         </div>
//       )}
//     </div>
//   );
// };

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
    // TODO: Change when multi-tenancy enabled
    tenant: 'Admin',
    status: true,
    smtpConfigurationId: smtpOptions[0]?.value || '',
    // clientName: '',
    // company: '',
    // address: '',
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
        await dispatch(addEmailTemplate({ data: values }));
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
                    <Input name="status" label="Status" type="switch" />
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
