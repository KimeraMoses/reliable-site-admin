import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, ImageUpload, Input } from 'components';
import { deepEqual } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from 'store';

const fields = [
  { name: 'image', label: 'Avatar', type: 'image' },
  { name: 'fullName', label: 'Full Name', type: 'text' },
  { name: 'status', label: 'Status', type: 'switch' },
  { name: 'ipAddress', label: 'IP Address', type: 'text' },
];

const validationSchema = Yup.object().shape({
  // image: Yup.string().required('Image is required'),
});

export const ProfileDetails = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const initialValues = {
    image: user?.image,
    fullName: user?.fullName,
    status: user?.status,
    ipAddress: user?.ipAddress,
  };

  const dispatch = useDispatch();

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
            const fileName = values?.image?.name;
            const ext = fileName
              ? fileName.substr(fileName.lastIndexOf('.') + 1)
              : '';
            const newValues = {
              image: values?.image
                ? {
                    name: values?.image,
                    extension: ext,
                    data: values?.image,
                  }
                : undefined,
              fullName: values?.fullName,
              status: values?.status,
              ipAddress: values?.ipAddress,
            };
            // console.log(newValues);
            dispatch(updateUserProfile(newValues));
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
                          htmlFor={field?.name}
                          className="text-white text-[14px]"
                        >
                          {field?.label}
                        </label>
                        {field?.type === 'image' ? (
                          <ImageUpload name={field?.name} />
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
                  <Button
                    htmlType="submit"
                    disabled={deepEqual(initialValues, values)}
                    loading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
