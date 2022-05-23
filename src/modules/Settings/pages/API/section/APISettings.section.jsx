import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button, Input, Card } from 'components';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  enableThirdPartyAPIkeys: Yup.boolean().required('Status is required'),
  numberofRequestsPerIpApiKey: Yup.number().required('TTL is required'),
  intervalBeforeNextAPIkeyRequestInSeconds:
    Yup.number().required('Reason is required'),
});

// Fields
const fields = [
  {
    name: 'enableThirdPartyAPIkeys',
    label: 'Enable 3rd Party API Keys',
    type: 'switch',
  },
  {
    name: 'numberofRequestsPerIpApiKey',
    label: 'Number of Requests Per IP',
    type: 'number',
  },
  {
    name: 'intervalBeforeNextAPIkeyRequestInSeconds',
    label: 'Interval Before Next API Request in Seconds',
    type: 'number',
  },
];

export const APISettings = () => {
  const { settings, loading } = useSelector((state) => state?.appSettings);

  const initialValues = {
    enableThirdPartyAPIkeys: settings?.enableThirdPartyAPIkeys,
    numberofRequestsPerIpApiKey: settings?.numberofRequestsPerIpApiKey,
    intervalBeforeNextAPIkeyRequestInSeconds:
      settings?.intervalBeforeNextAPIkeyRequestInSeconds,
  };

  return (
    <Card heading="API Keys" loading={loading}>
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
          <Button htmlType="submit" type="ghost" className="px-[32px] h-[52px]">
            Save Changes
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};
