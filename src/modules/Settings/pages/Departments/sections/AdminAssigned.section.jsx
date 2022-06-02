import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { editDepartment } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";


const validationSchema = Yup.object().shape({
    adminAssigned: Yup.array().required('Admin Assigned is required'),
});

export const AdminAssigned = ({ show, setShow, editValue, users }) => {
    const initialValues = {
        id: editValue.id,
        name: editValue.name,
        companyName: editValue.companyName,
        clientAssigned: editValue?.clientAssigned?.split(","),
        status: editValue.status,
    };

    const { t } = useTranslation("/Departments/ns");
    const dispatch = useDispatch();
    const fields = [
        {
            type: "userList",
            name: "adminAssigned",
            placeholder: "Admin Assigned",
            title: t("Admin Assigned"),
            users: users
        }
    ];

    const { loading } = useSelector((state) => state?.paymentGateways);

    return (
        <Modal
            heading={t('assignedAdmin')}
            submitText={t('saveChanges')}
            show={show}
            setShow={setShow}
            fields={fields}
            loading={loading}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={async (values) => {
                await dispatch(editDepartment({ data: values }));
                setShow(false);
            }}
        />
    );
};
