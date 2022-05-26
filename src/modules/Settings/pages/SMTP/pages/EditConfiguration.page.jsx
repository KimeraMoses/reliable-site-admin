import { EditorState, convertFromHTML } from 'draft-js';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { convertToHTML } from 'draft-convert';
import { convertToRaw } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import { editSMTP } from 'store';
import './styles.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentState } from 'draft-js';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';

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

export function EditConfiguration() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.smtps);

  // Setting Initial Values
  const smtp = location?.state?.smtp;

  // Setting Header Editor's Initial Values
  const hcBlocks = convertFromHTML(smtp?.headerContent);
  const hcState = ContentState.createFromBlockArray(
    hcBlocks?.contentBlocks,
    hcBlocks?.entityMap
  );
  const hcEditorState = EditorState.createWithContent(hcState);
  // Setting Signature Editor's Initial Values
  const scBlocks = convertFromHTML(smtp?.signature);
  const scState = ContentState.createFromBlockArray(
    scBlocks?.contentBlocks,
    scBlocks?.entityMap
  );
  const scEditorState = EditorState.createWithContent(scState);
  // Setting Signature Editor's Initial Values
  const fcBlocks = convertFromHTML(smtp?.footerContent);
  const fcState = ContentState.createFromBlockArray(
    fcBlocks?.contentBlocks,
    fcBlocks?.entityMap
  );
  const fcEditorState = EditorState.createWithContent(fcState);

  const initialValues = {
    id: smtp?.id,
    host: smtp?.host,
    port: smtp?.port,
    httpsProtocol: smtp?.httpsProtocol,
    fromName: smtp?.fromName,
    fromEmail: smtp?.fromEmail,
    companyAddress: smtp?.companyAddress,
    bcc: smtp?.bcc ? smtp?.bcc?.split(',') : [],
    headerContent: smtp?.headerContent,
    signature: smtp?.signature,
    footerContent: smtp?.footerContent,
    headerContentHolder: hcEditorState,
    signatureHolder: scEditorState,
    footerContentHolder: fcEditorState,
  };
  // Setting Initial Values End

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        if (deepEqual(initialValues, values)) {
          toast.info('Nothing Changed in SMTP Settings');
          return navigate('/admin/dashboard/settings/smtp');
        } else {
          const finalValues = {
            id: values?.id,
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
          await dispatch(editSMTP({ data: finalValues }));
          navigate('/admin/dashboard/settings/smtp');
        }
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
                    <MultiSelect
                      name="bcc"
                      label="BCC"
                      placeholder="Enter Email Addresses"
                      mode="tags"
                    />
                  </div>
                  <Button className="mt-[32px]" htmlType="submit">
                    Edit Configuration
                  </Button>
                </div>
                {/* Header, Footer, and Signature Side */}
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                      Header Content
                    </h6>
                    <ConfigurationEditor
                      editorState={values?.headerContentHolder}
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
                  {/* Signature */}
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                      Signature
                    </h6>
                    <ConfigurationEditor
                      editorState={values?.signatureHolder}
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
                  {/* Footer */}
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                      Footer Content
                    </h6>
                    <ConfigurationEditor
                      editorState={values?.footerContentHolder}
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
                </div>
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
}
