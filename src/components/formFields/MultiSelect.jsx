import { Select } from 'antd';
import { Field } from 'formik';
import './style.scss';

export const MultiSelect = ({
  name,
  label,
  placeholder,
  options,
  mode = 'multiple',
}) => {
  return (
    <Field name={name}>
      {({ meta, form: { setFieldValue, setFieldTouched } }) => {
        return (
          <div className="w-full">
            {label ? (
              <label
                htmlFor={name}
                className="mb-[16px] text-white text-[14px]"
              >
                {label}
              </label>
            ) : null}
            <Select
              mode={mode}
              style={{ width: '100%' }}
              placeholder={placeholder}
              className="custom-select"
              dropdownClassName="custom-select__dropdown"
              options={options}
              value={meta.value}
              onChange={(value) => {
                setFieldValue(name, value);
              }}
              onBlur={() => {
                setFieldTouched(name, true);
              }}
            />
            {meta.touched && Array.isArray(meta.error) ? (
              <>
                {meta.error.map((err, index) => (
                  <div key={`error-tag-${index}`} className="error">
                    {err}
                  </div>
                ))}
              </>
            ) : meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};
