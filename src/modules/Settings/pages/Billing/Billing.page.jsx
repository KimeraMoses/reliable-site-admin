import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  maxNumberOfRefunds: Yup.number().required('This is a required field'),
  minOrderAmount: Yup.number().required('This is a required field'),
});

export default function Billing() {
  // Fields
  const fields = [
    {
      name: 'maxNumberOfRefunds',
      label: 'Max Number of Refunds',
      type: 'number',
    },
    {
      name: 'minOrderAmount',
      label: 'Minimum Order Amount',
      type: 'number',
    },
  ];

  const { settings, loading } = useSelector((state) => state?.appSettings);
  const initialValues = {
    maxNumberOfRefunds: settings?.maxNumberOfRefunds,
    minOrderAmount: settings?.minOrderAmount,
  };

  return (
    <div className="p-[40px]">
      <Card heading="Billing Settings" loading={loading}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <div className="grid grid-cols-4 gap-[20px] mb-[32px]">
              {fields.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field?.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  options={field.options}
                />
              ))}
            </div>
            <Button
              htmlType="submit"
              type="ghost"
              className="px-[32px] h-[52px]"
            >
              Save Changes
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}
