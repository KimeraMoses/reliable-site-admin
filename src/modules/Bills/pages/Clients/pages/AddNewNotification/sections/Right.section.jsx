import { Field } from 'formik';
import { useFormikContext } from 'formik';
import { convertToHTML } from 'draft-convert';
import { convertToRaw } from 'draft-js';

import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import './Right.styles.scss';

const getInputEl = ({ options, name, placeholder, type }) => {
  switch (type) {
    case 'multiselect':
      return (
        <div className="custom-multiselect-mass-email-clients w-full">
          <MultiSelect
            name={name}
            options={options}
            mode="multiple"
            placeholder={placeholder}
          />
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
    case 'number':
      return (
        <Field
          name={name}
          type="number"
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

export function Right() {
  const { values, setFieldValue, setFieldTouched, touched, errors } =
    useFormikContext();
  return (
    <>
      {/* Header, Footer, and Signature Side */}
      <div className="flex flex-col gap-[20px]">
        {/* Notification Body Side */}
        <div className="flex flex-col gap-[20px]">
          <div className="bg-[#1E1E2D] rounded-[8px]">
            <h6 className="text-white font-medium p-[32px]">
              Notification Content
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
                name="title"
                label="Title"
                placeholder="[Enter Title]"
                touched={touched}
                errors={errors}
                type="text"
              />
              <EmailBodyInput
                name="startDate"
                label="Start Date"
                placeholder="[Enter Start Date]"
                touched={touched}
                errors={errors}
                type="text"
              />
              <EmailBodyInput
                name="endDate"
                label="End Date"
                placeholder="[Enter End Date]"
                touched={touched}
                errors={errors}
                type="text"
              />
            </div>
            <ConfigurationEditor
              editorState={values?.bodyHolder}
              onBlur={() => setFieldTouched('body', true)}
              onEditorStateChange={(state) => {
                setFieldValue('bodyHolder', state);
                const currentContentAsHTML = convertToHTML(
                  state.getCurrentContent()
                );
                if (
                  convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                  convertToRaw(state.getCurrentContent()).blocks[0].text === ''
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
            <div className="p-[32px]">
              <Button>Save Template</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
