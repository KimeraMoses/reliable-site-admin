import { DatePicker as $DatePicker } from 'antd';
import { Field } from 'formik';
import './style.scss';

export const DatePicker = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className="w-full">
          <$DatePicker
            onChange={(date, datString) =>
              setFieldValue(name, { date, datString })
            }
            dropdownClassName="custom-date-picker-dd"
            showTime={{ format: 'HH:mm' }}
            className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
