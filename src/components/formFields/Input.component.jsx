import { Field } from 'formik';
import { Input as $Input, Switch } from 'antd';

export const Input = ({ name, placeholder, type }) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className="w-full">
          {type === 'switch' ? (
            <div className="w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]">
              <>{values[name] ? 'Enabled' : 'Disabled'}</>
              <Switch
                checked={values[name]}
                onChange={(e) => setFieldValue(name, e)}
              />
            </div>
          ) : (
            <>
              <$Input
                {...field}
                className="w-full h-[52px] bg-[#171723] border-none rounded-[8px] placeholder:text-[#92928F] text-[#92928F] px-[16px]"
                placeholder={placeholder}
                type={type}
              />
              {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
              )}
            </>
          )}
        </div>
      )}
    </Field>
  );
};
