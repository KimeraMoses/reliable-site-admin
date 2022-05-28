import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { editBrand } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    //logo: Yup.mixed().required('Logo is required'),
    clientAssigned: Yup.string().required('Client Assigned is required'),
    status: Yup.bool().required('Status is required'),
});

export const EditBrand = ({ show, setShow, editValue }) => {
    const initialValues = {
        id: editValue.id,
        name: editValue.name,
        companyName: editValue.companyName,
        clientAssigned: editValue.clientAssigned,
        status: editValue.status,
    };

    const { t } = useTranslation("/Brands/ns");
    const dispatch = useDispatch();
    const fields = [
        {
            type: "input",
            name: "name",
            placeholder: "Brand Name",
            title: t("Name"),
        },
        {
            type: "input",
            name: "companyName",
            placeholder: "Mind2Matter",
            title: t("Company"),
        },
        {
            type: "file",
            name: "logoUrl",
            title: t("Logo"),
            text: "BROWSE LOGO",
        },
        {
            type: "text",
            name: "clientAssigned",
            placeholder: "Client Assigned",
            text: t("client_assigned"),
        },
        {
            type: "switch",
            name: "status",
            title: t("status"),
        },
    ];

    const { loading } = useSelector((state) => state?.paymentGateways);

    return (
        <Modal
            heading={t('editBrand')}
            submitText={t('editBrand')}
            show={show}
            setShow={setShow}
            fields={fields}
            loading={loading}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={async (values) => {
                await dispatch(editBrand({ data: values }));
                setShow(false);
            }}
        />
    );
};
