import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';

const initialValues = {
  maxNumberOfSubCategories: 20,
  autoApproveNewArticles: true,
};

const validationSchema = Yup.object().shape({
  maxNumberOfSubCategories: Yup.number()
    .min(1, 'Must be greater than 0')
    .max(100, 'Must be less than 100')
    .required('This is a required field'),
  autoApproveNewArticles: Yup.boolean().required('This is a required field'),
});

export default function Support() {
  // Fields
  const fields = [
    {
      name: 'maxNumberOfSubCategories',
      label: 'Max Number of Refunds',
      type: 'number',
    },
    {
      name: 'autoApproveNewArticles',
      label: 'Auto Approve New Articles',
      type: 'switch',
    },
  ];

  return (
    <div className="p-[40px]">
      <Card heading="Support Settings">
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
