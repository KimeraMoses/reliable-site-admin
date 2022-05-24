import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  enableLoginIntervalInSeconds_PortalSettings: Yup.boolean().required(
    'This is a required field'
  ),
  loginIntervalInSeconds_PortalSettings: Yup.number().required(
    'This is a required field'
  ),
});

export default function Portal() {
  const { settings, loading } = useSelector((state) => state?.appSettings);
  const initialValues = {
    enableLoginIntervalInSeconds_PortalSettings:
      settings?.enableLoginIntervalInSeconds_PortalSettings,
    loginIntervalInSeconds_PortalSettings:
      settings?.loginIntervalInSeconds_PortalSettings,
  };

  return (
    <div className="p-[40px]">
      <Card heading="Support Settings" loading={loading}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => console.log(values)}
        >
          {({ values }) => {
            // Conditional Based Rendering of Fields Start
            // Fields
            const fields = [
              {
                name: 'enableLoginIntervalInSeconds_PortalSettings',
                label: 'Enable / Disable Login Interval In Seconds',
                type: 'switch',
                show: true,
              },
              {
                name: 'loginIntervalInSeconds_PortalSettings',
                label: 'Login Interval In Seconds',
                type: 'number',
                show: values.enableLoginIntervalInSeconds_PortalSettings,
              },
            ];
            // Conditional Based Rendering of Fields End
            return (
              <Form>
                <div className="grid grid-cols-4 gap-[20px] mb-[32px]">
                  {fields.map((field) =>
                    field?.show ? (
                      <Input
                        key={field?.name}
                        name={field?.name}
                        label={field?.label}
                        placeholder={field?.placeholder}
                        type={field?.type}
                        options={field?.options}
                      />
                    ) : null
                  )}
                </div>
                <Button
                  htmlType="submit"
                  type="ghost"
                  className="px-[32px] h-[52px]"
                >
                  Save Changes
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
