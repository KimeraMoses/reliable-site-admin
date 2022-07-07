import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';
import { updateAppSettings } from 'store';

const validationSchema = Yup.object().shape({
  foceMFA: Yup.boolean().required('This is a required field'),
  googleAuthenticator: Yup.boolean().required('This is a required field'),
  microsoftAuthenticator: Yup.boolean().required('This is a required field'),
});

export function MFASettings() {
  const { settings } = useSelector((state) => state?.appSettings);
  const dispatch = useDispatch();

  const initialValues = {
    forceAdminMFA: settings?.forceAdminMFA,
    forceClientMFA: settings?.forceClientMFA,
    googleAuthenticator: settings?.googleAuthenticator,
    microsoftAuthenticator: settings?.microsoftAuthenticator,
  };

  // Fields
  const fields = [
    {
      name: 'forceAdminMFA',
      label: 'Force Admin MFA',
      type: 'switch',
    },
    {
      name: 'forceClientMFA',
      label: 'Force Client MFA',
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
    <Card heading="MFA Settings" className="mt-[40px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          if (deepEqual(values, initialValues)) {
            toast.info('No changes were made');
          } else {
            await dispatch(
              updateAppSettings({ id: settings?.id, data: values })
            );
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
