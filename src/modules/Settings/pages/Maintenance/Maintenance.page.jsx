import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';

const initialValues = {
  status: true,
  tllInSeconds: 7200,
  reason: '',
};

const validationSchema = Yup.object().shape({
  status: Yup.boolean().required('Status is required'),
  tllInSeconds: Yup.number().required('TTL is required'),
  reason: Yup.string().required('Reason is required'),
});

export default function Maintenance() {
  // Fields
  const fields = [
    {
      name: 'status',
      label: 'Status',
      type: 'switch',
    },
    {
      name: 'tllInSeconds',
      label: 'TLL in Seconds',
      type: 'number',
    },
  ];

  return (
    <div className="p-[40px]">
      <Card heading="Maintenance Settings">
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
            <div className="grid grid-cols-2 gap-[20px] mb-[32px]">
              <Input
                name="reason"
                label="Reason"
                placeholder="Enter Reason"
                type="textarea"
                rows={10}
              />
            </div>
            <Button
              htmlType="submit"
              type="ghost"
              className="px-[32px] mt-[32px] h-[52px]"
            >
              Save Changes
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}
