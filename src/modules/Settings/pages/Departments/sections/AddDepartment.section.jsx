import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";



const initialValues = {
    name: '',
    deptStatus: true
};


const validationSchema = Yup.object().shape({
    deptNumber: Yup.string().required('Number is required'),
    name: Yup.string().required('Name is required'),
    deptStatus: Yup.string().required('Status is required'),
});

export const AddDepartment = ({ show, setShow, users }) => {
    const { t } = useTranslation("/Settings/ns");
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
            name: "departmentAdmins",
            placeholder: "Admin Assigned",
            title: t("adminAssigned"),
            users: users
        },
    ];
    const { loading } = useSelector((state) => state?.paymentGateways);
    return (
        <Modal
            heading={t('addNewDepartment')}
            submitText={t('addDepartment')}
            show={show}
            loading={loading}
            setShow={setShow}
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={async (values) => {
                await dispatch(addDepartment(values));
                setShow(false);
            }}
        />
    );
};
