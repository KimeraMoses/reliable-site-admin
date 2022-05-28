import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";



const initialValues = {
    name: '',
    companyName: '',
    logoUrl: '',
    clientAssigned: '',
    status: true,
};


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    //logo: Yup.mixed().required('Logo is required'),
    clientAssigned: Yup.string().required('Client Assigned is required'),
    status: Yup.bool().required('Status is required'),
});

export const AddBrand = ({ show, setShow }) => {
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
            heading={t('addNewBrand')}
            submitText={t('addBrand')}
            show={show}
            loading={loading}
            setShow={setShow}
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={async (values) => {
                await dispatch(addBrand(values));
                setShow(false);
            }}
        />
    );
};
