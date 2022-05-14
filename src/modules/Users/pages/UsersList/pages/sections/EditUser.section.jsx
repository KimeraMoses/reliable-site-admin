import { Modal } from 'components';
import { deepEqual } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  status: Yup.bool().required('Status is required'),
  ipAddress: Yup.string().required('IP Address is required'),
});

export const EditUser = ({ t, show, setShow, user }) => {
  const initialValues = {
    fullName: user?.fullName,
    status: user?.status,
    ipAddress: user?.restrictAccessIPAddress,
    // adminGroupID: user?.adminGroupID,
  };

  const { loading } = useSelector((state) => state?.users);

  const dispatch = useDispatch();

  const fields = [
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      fields={fields}
      handleSubmit={async (values) => {
        if (deepEqual(values, initialValues)) {
          toast.warn('Nothing is changed!');
        } else {
          await dispatch(updateUser(user?.id, values));
        }
        setShow(false);
      }}
    />
  );
};
