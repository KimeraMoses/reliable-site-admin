import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { editDepartment } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";


const validationSchema = Yup.object().shape({
    deptNumber: Yup.string().required('Number is required'),
    name: Yup.string().required('Name is required'),
    deptStatus: Yup.string().required('Status is required'),
});

export const EditDepartment = ({ show, setShow, editValue, users }) => {
    const initialValues = {
        id: editValue.id,
        deptNumber: editValue.deptNumber,
        name: editValue.name,
        deptStatus: editValue.deptStatus,
        adminAssigned: editValue.adminAssigned,
    };

    const { t } = useTranslation("/Departments/ns");
    const dispatch = useDispatch();
    const fields = [
        {
            type: "input",
            name: "deptNumber",
            placeholder: "1",
            title: t("number"),
        },
        {
            type: "input",
            name: "name",
            placeholder: "Department Name",
            title: t("Name"),
        },
        {
            type: "switch",
            name: "deptStatus",
            title: t("status"),
        },
        {
            type: "userList",
            name: "adminAssigned",
            placeholder: "Admin Assigned",
            title: t("adminAssigned"),
            users: users
        },
    ];

    const { loading } = useSelector((state) => state?.paymentGateways);

    return (
        <Modal
            heading={t('editDepartment')}
            submitText={t('editDepartment')}
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
