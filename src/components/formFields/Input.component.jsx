import { Field } from 'formik';
import { Input as $Input, Switch } from 'antd';

const InputType = ({
  field,
  type,
  values,
  name,
  setFieldValue,
  placeholder,
  options,
  disabled,
}) => {
  switch (type) {
    case 'switch':
      return (
        <div className="w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]">
          <>{values[name] ? 'Enabled' : 'Disabled'}</>
          <Switch
            disabled={disabled}
            checked={values[name]}
            onChange={(e) => setFieldValue(name, e)}
          />
        </div>
      );
    case 'select':
      return (
        <select
          disabled={disabled}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          className="form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
        >
          {options?.map((option) => (
            <option value={option?.value} key={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <$Input
          {...field}
          className="w-full h-[52px] bg-[#171723] border-none rounded-[8px] placeholder:text-[#92928F] text-[#92928F] px-[16px] disabled:bg-[#323248]"
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
      );
  }
};

export const Input = ({
  name,
  placeholder,
  type,
  label,
  options,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className="w-full">
          {label ? (
            <label htmlFor={name} className="mb-[16px] text-white text-[14px]">
              {label}
            </label>
          ) : null}
          <InputType
            type={type}
            field={field}
            values={values}
            name={name}
            setFieldValue={setFieldValue}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
