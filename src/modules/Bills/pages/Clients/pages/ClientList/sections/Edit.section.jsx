import { Modal } from 'components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  status: Yup.bool().required('Status is required'),
  // ipAddress: Yup.string().required('IP Address is required'),
  brandId: Yup.string().required('Brand is required'),
});

export const EditClientUser = ({ show, setShow, client }) => {
  const { t } = useTranslation('/Users/ns');
  const dispatch = useDispatch();
  const { loading, clients } = useSelector((state) => state?.users);
  // const allUsers = [...users, ...clients];
  const { brands } = useSelector((state) => state?.brands);
  const brandsLoading = useSelector((state) => state?.brands?.loading);
  const initialValues = {
    fullName: client?.fullName,
    status: client?.status,
    parentID:
      !client?.parentID || client?.parentID === '0' ? '' : client?.parentID,
    brandId: !client?.brandId || client?.brandId === '0' ? '' : client?.brandId,
  };

  const editFields = [
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
      type: 'select',
      name: 'brandId',
      title: 'Select Brand',
      placeholder: 'Select Brand',
      options: brands?.map((brand) => ({
        label: brand?.name,
        value: brand?.id,
      })),
    },
    {
      type: 'select',
      name: 'parentID',
      placeholder: 'Select Parent User',
      title: 'Parent User',
      options: clients?.map((user) => ({
        label: user?.userName,
        value: user?.id,
      })),
    },
  ];
  return (
    <Modal
      heading="Edit Client User"
      submitText="Edit Client User"
      show={show}
      loading={loading || brandsLoading}
      setShow={setShow}
      fields={editFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={async (values) => {
        await dispatch(updateUser(client?.id, values));
        setShow(false);
      }}
    />
  );
};
