import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';

const initialValues = {
  twoFactorAuth: true,
  googleAuth: true,
  microsoftAuth: true,
};

const validationSchema = Yup.object().shape({
  twoFactorAuth: Yup.boolean().required('This is a required field'),
  googleAuth: Yup.boolean().required('This is a required field'),
  microsoftAuth: Yup.boolean().required('This is a required field'),
});

export function MFASettings() {
  // Fields
  const fields = [
    {
      name: 'twoFactorAuth',
      label: '2 Factor Authentication',
      type: 'switch',
    },
    {
      name: 'googleAuth',
      label: 'Google Authentication',
      type: 'switch',
    },
    {
      name: 'microsoftAuth',
      label: 'Microsoft Authentication',
      type: 'switch',
    },
  ];

  return (
    <Card heading="2FA & MFA" className="mt-[40px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
          <Button htmlType="submit" type="ghost" className="px-[32px] h-[52px]">
            Save Changes
          </Button>
        </Form>
      </Formik>
    </Card>
  );
}
