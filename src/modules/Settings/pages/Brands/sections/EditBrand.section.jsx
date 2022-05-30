import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { editBrand } from 'store';
import * as Yup from 'yup';
import { convertBase64 } from 'lib';
import { useTranslation } from "react-i18next";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    //logo: Yup.mixed().required('Logo is required'),
    clientAssigned: Yup.array().required('Client Assigned is required'),
    status: Yup.bool().required('Status is required'),
});

export const EditBrand = ({ show, setShow, editValue, users }) => {
    console.log(editValue);
    const initialValues = {
        id: editValue.id,
        name: editValue.name,
        companyName: editValue.companyName,
        logoUrl: editValue.logoUrl,
        clientAssigned: editValue?.clientAssigned?.split(","),
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
            title: t("logo"),
            subText: t("browseLogo")
        },
        {
            type: "switch",
            name: "status",
            title: t("status"),
        },
        {
            type: "userList",
            name: "clientAssigned",
            placeholder: "Client Assigned",
            title: t("clientAssigned"),
            users: users
        }
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
                const fileName = values?.image?.name;
                const imgData = {};
                if (fileName) {
                    const ext = fileName.substr(fileName.lastIndexOf('.'));
                    const finalName = fileName.substr(0, fileName.indexOf('.'));
                    let base64image = '';
                    try {
                        base64image = await convertBase64(values?.image);
                        imgData.name = finalName;
                        imgData.extension = `${ext}`;
                        imgData.data = base64image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                    } catch (e) {
                        base64image = '';
                    }
                }
                const newValues = {
                    image: Object.keys(imgData).length ? imgData : undefined,
                    name: values?.name,
                    companyName: values?.companyName,
                    logoUrl: values?.logoUrl,
                    clientAssigned: values?.clientAssigned.toString(),
                    status: values?.status,
                    id: values?.id
                };
                await dispatch(editBrand({ data: newValues }));
                setShow(false);
            }}
        />
    );
};
