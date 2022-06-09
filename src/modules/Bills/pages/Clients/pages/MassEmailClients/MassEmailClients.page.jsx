import { EditorState } from 'draft-js';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { convertToHTML } from 'draft-convert';
import { convertToRaw } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import { addSMTP } from 'store';
import { useNavigate } from 'react-router-dom';
import './MassEmailClients.styles.scss';

const initialValues = {
  host: '',
  port: '',
  httpsProtocol: false,
  fromName: '',
  fromEmail: '',
  companyAddress: '',
  bcc: [],
  headerContent: '',
  signature: '',
  footerContent: '',
  headerContentHolder: EditorState.createEmpty(),
  signatureHolder: EditorState.createEmpty(),
  footerContentHolder: EditorState.createEmpty(),
};

const validationSchema = Yup.object().shape({
  host: Yup.string().required('Host is required'),
  port: Yup.string().required('Port is required'),
  httpsProtocol: Yup.boolean().required('Protocol is required'),
  fromName: Yup.string().required('From Name is required'),
  fromEmail: Yup.string()
    .required('From Email is required')
    .email('Please enter a valid email.'),
  companyAddress: Yup.string().required('Company Address is required'),
  bcc: Yup.lazy((val) => {
    if (Array.isArray(val)) {
      return Yup.array()
        .min(1, 'At least 1 BCC is required.')
        .of(
          Yup.string().email(({ value }) => `${value} is not a valid email.`)
        );
    } else {
      return Yup.string().required('At least 1 BCC is required');
    }
  }),
  headerContent: Yup.string().required('Header Content is required'),
  signature: Yup.string().required('Signature is required'),
  footerContent: Yup.string().required('Footer Content is required'),
});

const getInputEl = ({ options, name, placeholder, type }) => {
  switch (type) {
    case 'multiselect':
      return (
        <div className="custom-multiselect-mass-email-clients w-full">
          <MultiSelect name={name} options={options} mode="multiple" />
        </div>
      );
    case 'text':
      return (
        <Field
          name={name}
          placeholder={placeholder}
          className="h-[52px] w-[60%] text-[#92928f] placeholder:text-[#92928f] bg-[transparent] focus-visible:outline-none"
        />
      );
    case 'select':
      return (
        <div className="custom-select-mass-email-clients w-full">
          <Input
            type={type}
            placeholder={placeholder}
            name={name}
            options={options}
          />
        </div>
      );
    default:
      break;
  }
};

const EmailBodyInput = ({
  touched,
  errors,
  name,
  placeholder,
  label,
  options,
  type,
}) => {
  return (
    <div className="flex gap-[20px] bg-[#28283a] items-center">
      <h6 className="px-[32px] w-[20%] text-white whitespace-nowrap">
        {label}
      </h6>
      {getInputEl({ options, name, placeholder, type })}
      {touched[name] && errors[name] && (
        <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
          {errors[name]}
        </div>
      )}
    </div>
  );
};

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

export function MassEmailClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.smtps);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        const finalValues = {
          host: values?.host,
          port: values?.port,
          httpsProtocol: values?.httpsProtocol,
          fromName: values?.fromName,
          fromEmail: values?.fromEmail,
          companyAddress: values?.companyAddress,
          bcc: `${values?.bcc}`,
          headerContent: values?.headerContent,
          signature: values?.signature,
          footerContent: values?.footerContent,
          // TODO: Change brandIds once we have multiple brands
          brandIds: ['1ac3fe50-d86a-420a-bb04-728a2b0c394a'],
        };
        await dispatch(addSMTP({ data: finalValues }));
        navigate('/admin/dashboard/settings/smtp');
      }}
    >
      {({ setFieldTouched, values, setFieldValue, touched, errors }) => {
        return (
          <Form>
            <Spin spinning={loading}>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] px-[32px] py-[40px]">
                {/* SMTP Configuration Side */}
                <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
                  <h6 className="text-white mb-[32px]">SMTP Configuration</h6>
                  <div className="flex flex-col gap-[20px]">
                    <Input name="host" label="Host" placeholder="Host Name" />
                    <Input name="port" label="Port" placeholder="3000" />
                    <Input
                      name="httpsProtocol"
                      label="HTTPs Protocol"
                      type="switch"
                    />
                    <Input
                      name="fromName"
                      label="From - Name"
                      placeholder="Paul Elliott"
                    />
                    <Input
                      name="fromEmail"
                      label="From - Email Address"
                      placeholder="Paul.Elliott@gmail.com"
                    />
                    <Input
                      name="companyAddress"
                      label="Company Address"
                      placeholder="1244, Reppert Coal Road, Southfield"
                    />
                    {/* TODO: Add Brands Here Once Done */}
                    <MultiSelect
                      name="bcc"
                      label="BCC"
                      placeholder="Enter Email Addresses"
                      mode="tags"
                    />
                  </div>
                  <Button className="mt-[32px]" htmlType="submit">
                    Add New Configuration
                  </Button>
                </div>
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
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
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
                      onBlur={() => setFieldTouched('footerContent', true)}
                      onEditorStateChange={(state) => {
                        setFieldValue('footerContentHolder', state);
                        const currentContentAsHTML = convertToHTML(
                          state.getCurrentContent()
                        );
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
                        ) {
                          setFieldValue('footerContent', '');
                        } else {
                          setFieldValue('footerContent', currentContentAsHTML);
                        }
                      }}
                    />
                    {touched['footerContent'] && errors['footerContent'] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors['footerContent']}
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
                      onBlur={() => setFieldTouched('signature', true)}
                      onEditorStateChange={(state) => {
                        setFieldValue('signatureHolder', state);
                        const currentContentAsHTML = convertToHTML(
                          state.getCurrentContent()
                        );
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
                        ) {
                          setFieldValue('signature', '');
                        } else {
                          setFieldValue('signature', currentContentAsHTML);
                        }
                      }}
                    />
                    {touched['signature'] && errors['signature'] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors['signature']}
                      </div>
                    )}
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
                          type="text"
                        />
                        <EmailBodyInput
                          name="company"
                          label="Company"
                          placeholder="[company]"
                          touched={touched}
                          errors={errors}
                          type="text"
                        />
                        <EmailBodyInput
                          name="address"
                          label="Address"
                          placeholder="[address]"
                          touched={touched}
                          errors={errors}
                          type="text"
                        />
                        <EmailBodyInput
                          name="emailTo"
                          label="To"
                          options={[
                            { label: 'Client # 1', value: 'client1' },
                            { label: 'Client # 2', value: 'client2' },
                          ]}
                          touched={touched}
                          errors={errors}
                          type="multiselect"
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
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
}
