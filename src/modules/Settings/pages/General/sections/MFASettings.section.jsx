import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useSelector } from 'react-redux';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  foceMFA: Yup.boolean().required('This is a required field'),
  googleAuthenticator: Yup.boolean().required('This is a required field'),
  microsoftAuthenticator: Yup.boolean().required('This is a required field'),
});

export function MFASettings() {
  const { settings } = useSelector((state) => state?.appSettings);

  const initialValues = {
    foceMFA: settings?.forceMFA,
    googleAuthenticator: settings?.googleAuthenticator,
    microsoftAuthenticator: settings?.microsoftAuthenticator,
  };

  // Fields
  const fields = [
    {
      name: 'foceMFA',
      label: '2 Factor Authentication',
      type: 'switch',
    },
    {
      name: 'googleAuthenticator',
      label: 'Google Authentication',
      type: 'switch',
    },
    {
      name: 'microsoftAuthenticator',
      label: 'Microsoft Authentication',
      type: 'switch',
    },
  ];

  return (
    <Card heading="2FA & MFA" className="mt-[40px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          if (deepEqual(values, initialValues)) {
            toast.info('No changes were made');
          } else {
            console.log(values);
          }
        }}
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
