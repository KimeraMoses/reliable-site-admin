import { EditorState } from 'draft-js';
import * as Yup from 'yup';
import { Spin } from 'antd';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Left, Right } from './sections';

const initialValues = {
  host: '',
  port: '',
  httpsProtocol: false,
  fromName: '',
  fromEmail: '',
  companyAddress: '',
  bcc: [],
  headerContent: '',
  signature: '',
  footerContent: '',
  headerContentHolder: EditorState.createEmpty(),
  signatureHolder: EditorState.createEmpty(),
  footerContentHolder: EditorState.createEmpty(),
};

const validationSchema = Yup.object().shape({
  host: Yup.string().required('Host is required'),
  port: Yup.string().required('Port is required'),
  httpsProtocol: Yup.boolean().required('Protocol is required'),
  fromName: Yup.string().required('From Name is required'),
  fromEmail: Yup.string()
    .required('From Email is required')
    .email('Please enter a valid email.'),
  companyAddress: Yup.string().required('Company Address is required'),
  bcc: Yup.lazy((val) => {
    if (Array.isArray(val)) {
      return Yup.array()
        .min(1, 'At least 1 BCC is required.')
        .of(
          Yup.string().email(({ value }) => `${value} is not a valid email.`)
        );
    } else {
      return Yup.string().required('At least 1 BCC is required');
    }
  }),
  headerContent: Yup.string().required('Header Content is required'),
  signature: Yup.string().required('Signature is required'),
  footerContent: Yup.string().required('Footer Content is required'),
});

export const MassEmailClients = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          const finalValues = {
            host: values?.host,
            port: values?.port,
            httpsProtocol: values?.httpsProtocol,
            fromName: values?.fromName,
            fromEmail: values?.fromEmail,
            companyAddress: values?.companyAddress,
            bcc: `${values?.bcc}`,
            headerContent: values?.headerContent,
            signature: values?.signature,
            footerContent: values?.footerContent,
            // TODO: Change brandIds once we have multiple brands
            brandIds: ['1ac3fe50-d86a-420a-bb04-728a2b0c394a'],
          };
          // navigate('/admin/dashboard/settings/smtp');
          console.log(finalValues);
        }}
      >
        {({ setFieldTouched, values, setFieldValue, touched, errors }) => {
          return (
            <Form>
              <Spin spinning={false}>
                <div className="grid grid-cols-[1fr_3fr] gap-[20px] px-[32px] py-[40px]">
                  <Left />
                  <Right />
                </div>
              </Spin>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
