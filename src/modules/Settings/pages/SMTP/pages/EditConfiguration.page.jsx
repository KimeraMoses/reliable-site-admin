import { EditorState } from 'draft-js';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState } from 'react';

import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import './styles.scss';

const initialValues = {
  host: '',
  port: '',
  protocol: '',
  fromName: '',
  fromEmail: '',
  companyAddress: '',
  bcc: '',
  brands: '',
};

const validationSchema = Yup.object().shape({
  host: Yup.string().required('Host is required'),
  port: Yup.string().required('Port is required'),
  protocol: Yup.string().required('Protocol is required'),
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
  brands: Yup.lazy((val) => {
    if (Array.isArray(val)) {
      return Yup.array().min(1, 'At least 1 brand is required');
    } else {
      return Yup.string().required('At least 1 brand is required');
    }
  }),
});

const ConfigurationEditor = ({ editorState, onEditorStateChange }) => {
  return (
    <div className="configuration-editor">
      <div className="configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="configuration-editor__container-wrapper"
          editorClassName="configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
};

export function EditConfiguration() {
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty());

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {({ values }) => {
        return (
          <Form>
            <div className="grid grid-cols-[1fr_3fr] gap-[20px] px-[32px] py-[40px]">
              {/* SMTP Configuration Side */}
              <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
                <h6 className="text-white mb-[32px]">SMTP Configuration</h6>
                <div className="flex flex-col gap-[20px]">
                  <Input name="host" label="Host" placeholder="Host Name" />
                  <Input name="port" label="Port" placeholder="3000" />
                  <Input name="protocol" label="Protocol" placeholder="HTTP" />
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
                  <MultiSelect
                    name="brands"
                    label="Brands"
                    placeholder="Select Brands"
                    options={[{ label: 'Brand 1', value: 'brand1' }]}
                  />
                </div>
                <Button className="mt-[32px]" htmlType="submit">
                  Edit Configuration
                </Button>
              </div>
              {/* Signature Side */}
              <div className="flex flex-col gap-[20px]">
                <div className="bg-[#1E1E2D] rounded-[8px]">
                  <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                    Signature
                  </h6>
                  <ConfigurationEditor
                    editorState={editorState1}
                    onEditorStateChange={(state) => setEditorState1(state)}
                  />
                </div>
                <div className="bg-[#1E1E2D] rounded-[8px]">
                  <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                    Signature
                  </h6>
                  <ConfigurationEditor
                    editorState={editorState2}
                    onEditorStateChange={(state) => setEditorState2(state)}
                  />
                </div>
                <div className="bg-[#1E1E2D] rounded-[8px]">
                  <h6 className="text-white font-medium p-[32px] border-b-[1px] border-b-[#323248] border-dashed">
                    Signature
                  </h6>
                  <ConfigurationEditor
                    editorState={editorState3}
                    onEditorStateChange={(state) => setEditorState3(state)}
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
