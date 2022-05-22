import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { Input, SMTPEditor, Button } from 'components';
import './styles.scss';

const initialValues = {
  subject: '',
  config: '',
  status: true,
  clientName: '',
  company: '',
  address: '',
  emailBodyHolder: EditorState.createEmpty(),
  emailBody: '',
};

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  config: Yup.string().required('Configuration is required'),
  status: Yup.boolean().required('Status is required'),
  clientName: Yup.string().required('Client name is required'),
  company: Yup.string().required('Company is required'),
  address: Yup.string().required('Address is required'),
  emailBody: Yup.string().required('Email body is required'),
});

const ConfigurationEditor = ({ editorState, onEditorStateChange, onBlur }) => {
  return (
    <div className="configuration-editor">
      <div className="configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="configuration-editor__container-wrapper"
          editorClassName="configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

const EmailBodyInput = ({ touched, errors, name, placeholder, label }) => {
  return (
    <div className="flex gap-[20px] bg-[#28283a] items-center">
      <h6 className="px-[32px] w-[20%] text-white whitespace-nowrap">
        {label}
      </h6>
      <Field
        name={name}
        placeholder={placeholder}
        className="h-[52px] w-[60%] text-[#92928f] placeholder:text-[#92928f] bg-[#28283a] focus-visible:outline-none"
      />
      {touched[name] && errors[name] && (
        <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
          {errors[name]}
        </div>
      )}
    </div>
  );
};

export const AddTemplate = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
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
                    name="config"
                    label="SMTP Configuration"
                    placeholder="Select SMTP Configuration"
                    type="select"
                    options={[
                      { label: 'Config1', value: 'Config1' },
                      { label: 'Config2', value: 'Config2' },
                    ]}
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
                      placeholder="[fullName]"
                      touched={touched}
                      errors={errors}
                    />
                    <EmailBodyInput
                      name="company"
                      label="Company"
                      placeholder="[company]"
                      touched={touched}
                      errors={errors}
                    />
                    <EmailBodyInput
                      name="address"
                      label="Address"
                      placeholder="[address]"
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                  <ConfigurationEditor
                    editorState={values.emailBodyHolder}
                    onBlur={() => setFieldTouched('emailBody', true)}
                    onEditorStateChange={(state) => {
                      setFieldValue('emailBodyHolder', state);
                      const currentContentAsHTML = convertToHTML(
                        state.getCurrentContent()
                      );
                      if (
                        convertToRaw(state.getCurrentContent()).blocks
                          .length === 1 &&
                        convertToRaw(state.getCurrentContent()).blocks[0]
                          .text === ''
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
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
