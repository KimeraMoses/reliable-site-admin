import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button, Input, Card } from 'components';

const initialValues = {
  enable3rdPartyAPIKeys: true,
  numberOfRequestsPerIP: 200,
  intervalBeforeNextAPIRequestInSeconds: 3500,
};

const validationSchema = Yup.object().shape({
  enable3rdPartyAPIKeys: Yup.boolean().required('Status is required'),
  numberOfRequestsPerIP: Yup.number().required('TTL is required'),
  intervalBeforeNextAPIRequestInSeconds:
    Yup.number().required('Reason is required'),
});

// Fields
const fields = [
  {
    name: 'enable3rdPartyAPIKeys',
    label: 'Enable 3rd Party API Keys',
    type: 'switch',
  },
  {
    name: 'numberOfRequestsPerIP',
    label: 'Number of Requests Per IP',
    type: 'number',
  },
  {
    name: 'intervalBeforeNextAPIRequestInSeconds',
    label: 'Interval Before Next API Request in Seconds',
    type: 'number',
  },
];

export const APISettings = () => {
  return (
    <Card heading="API Keys">
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
};
