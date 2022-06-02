import { convertToHTML } from 'draft-convert';
import { convertToRaw } from 'draft-js';
import { useFormikContext } from 'formik';
import { Button, Input, SMTPEditor } from 'components';
import './styles.scss';

const ConfigurationEditor = ({ editorState, onEditorStateChange, onBlur }) => {
  return (
    <div className="gs-editor">
      <div className="gs-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="gs-editor__container-wrapper"
          editorClassName="gs-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export const GS = () => {
  const { values, setFieldValue, setFieldTouched, touched, errors } =
    useFormikContext();
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px] mt-[20px]">
      <h6 className="text-white text-[16px] mb-[32px]">General Settings</h6>
      <Input name="name" placeholder="Product Name" label="Product Name" />

      <div className="bg-[#1E1E2D] rounded-[8px]">
        <h6 className="text-white font-medium mt-[32px] pb-[16px]">
          Product Description
        </h6>
        <ConfigurationEditor
          editorState={values.descriptionHolder}
          onBlur={() => setFieldTouched('description', true)}
          onEditorStateChange={(state) => {
            setFieldValue('descriptionHolder', state);
            const currentContentAsHTML = convertToHTML(
              state.getCurrentContent()
            );
            if (
              convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
              convertToRaw(state.getCurrentContent()).blocks[0].text === ''
            ) {
              setFieldValue('description', '');
            } else {
              setFieldValue('description', currentContentAsHTML);
            }
          }}
        />
        {touched['description'] && errors['description'] && (
          <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
            {errors['description']}
          </div>
        )}
      </div>

      <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
        Save Changes
      </Button>
    </div>
  );
};
