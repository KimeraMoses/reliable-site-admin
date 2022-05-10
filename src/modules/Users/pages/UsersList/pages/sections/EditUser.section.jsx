import { Modal } from 'components';
import * as Yup from 'yup';

const addValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  status: Yup.bool().required('Status is required'),
  ipAddress: Yup.string().required('IP Address is required'),
});

export const EditUser = ({ t, show, setShow, user }) => {
  const initialAddValues = {
    fullName: user?.fullName,
    status: user?.status,
    ipAddress: user?.restrictAccessIPAddress,
  };

  const addFields = [
    {
      type: 'input',
      name: 'fullName',
      placeholder: 'Paul.Elliott',
      title: t('fullName'),
    },
    {
      type: 'switch',
      name: 'status',
      title: t('status'),
    },
    {
      type: 'input',
      name: 'ipAddress',
      placeholder: '253.205.121.39',
      title: t('ipAddress'),
    },
  ];

  return (
    <Modal
      show={show}
      setShow={setShow}
      heading={t('editUser')}
      submitText={t('editUser')}
      initialValues={initialAddValues}
      validationSchema={addValidationSchema}
      fields={addFields}
      handleSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
