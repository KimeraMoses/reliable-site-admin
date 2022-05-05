import { Field } from 'formik';
import { useRef } from 'react';
import './style.scss';

export const ImageUpload = ({ name }) => {
  const inputRef = useRef(null);
  return (
    <Field name={name} className="image-upload">
      {({ meta, form: { setFieldValue, values } }) => (
        <>
          <input
            type="file"
            accept="image/*"
            id="imgInp"
            className="image-upload__el"
            ref={inputRef}
            onChange={(e) => {
              const [file] = e.target.files;
              if (file) {
                setFieldValue(name, file);
                setFieldValue('preview', URL.createObjectURL(file));
              }
            }}
          />
          <div className="w-full flex gap-[18px]">
            <div className="flex justify-between w-full bg-[#171723] items-center rounded-[8px] p-[16px]">
              <div className="text-[#92928F] text-[14px]">
                {values?.[name]?.name
                  ? values?.[name]?.name
                  : 'Select Image...'}
              </div>
              <div
                className="text-[#3699FF] text-[14px] cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                Browse
              </div>
            </div>
            {values?.preview ? (
              <img
                src={values?.preview}
                className="h-[52px] w-[60px] rounded-[5px]"
                alt="preview"
              />
            ) : (
              <div className="h-[52px] w-[60px] rounded-[5px] border-1 border-[#3699FF] flex items-center justify-center text-white text-[10px]">
                Preview
              </div>
            )}
          </div>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  );
};
