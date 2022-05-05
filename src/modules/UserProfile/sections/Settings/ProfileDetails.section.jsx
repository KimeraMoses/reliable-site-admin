import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, ImageUpload, Input } from 'components';

const initialValues = {
  imageUrl: '',
  fullName: 'Paul Elliot',
  status: true,
  ipAddress: '253.205.121.39',
};
const fields = [
  { name: 'imageUrl', label: 'Avatar', type: 'image' },
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'status', label: 'Status', type: 'switch' },
  { name: 'ipAddress', label: 'IP Address', type: 'text' },
];

const validationSchema = Yup.object().shape({
  // imageUrl: Yup.string().required('Image is required'),
});

export const ProfileDetails = () => {
  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px]">
      {/* Heading */}
      <div className="p-[32px] border-b-[1px] border-b-[#323248] border-dashed text-white text-[16px]">
        Profile Details
      </div>
      {/* Form */}
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleReset }) => {
            return (
              <Form>
                {/* Form Fields */}
                <div className="p-[32px] border-b-[1px] border-b-[#323248] border-dashed flex flex-col gap-[18px]">
                  {fields?.map((field) => {
                    return (
                      <div
                        className="grid grid-cols-[1fr_2fr] items-center"
                        key={field?.name}
                      >
                        <label
                          for="imageUrl"
                          className="text-white text-[14px]"
                        >
                          {field?.label}
                        </label>
                        {field?.type === 'image' ? (
                          <ImageUpload name="imageUrl" />
                        ) : (
                          <Input
                            placeholder={field?.placeholder}
                            name={field?.name}
                            type={field?.type}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Form Buttons */}
                <div className="p-[32px] flex items-center gap-[8px]">
                  <Button type="secondary" onClick={handleReset}>
                    Discard
                  </Button>
                  <Button htmlType="submit">Save Changes</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
