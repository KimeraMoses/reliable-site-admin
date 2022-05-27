import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Input } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { deepEqual } from 'lib';
import { toast } from 'react-toastify';
import { updateBillingSettings } from 'store';

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
    {
      name: 'refundRetainPercentage',
      label: 'Refund Retain Percentage',
      type: 'number',
    },
  ];

  const dispatch = useDispatch();
  const { billingSettings, loading } = useSelector(
    (state) => state?.appSettings
  );
  const initialValues = {
    maxNumberOfRefunds: billingSettings?.maxNumberOfRefunds,
    minOrderAmount: billingSettings?.minOrderAmount,
    refundRetainPercentage: billingSettings?.refundRetainPercentage,
  };

  return (
    <div className="p-[40px]">
      <Card heading="Billing Settings" loading={loading}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            if (deepEqual(values, initialValues)) {
              toast.info('No changes were made');
            } else {
              await dispatch(
                updateBillingSettings({ id: billingSettings?.id, data: values })
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
