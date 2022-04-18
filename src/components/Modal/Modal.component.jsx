import { Modal as BSModal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import './Modal.styles.scss';

const demoFields = [
  {
    title: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Please enter title.',
  },
  {
    title: 'Sam',
    name: 'title',
    type: 'text',
    placeholder: 'Please enter title.',
  },
];

const vSchema = object({
  title: string().required('This field is required!'),
});

const iValues = {
  title: '',
};

export function Modal({
  show,
  setShow,
  heading,
  fields = demoFields,
  validationSchema = vSchema,
  initialValues = iValues,
  submitText = 'Add',
  handleSubmit = (values) => console.log(values),
}) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <BSModal show={show} onHide={handleClose} className="modal">
      <BSModal.Body className="modal__bg">
        <div className="modal__header">
          <h3>{heading}</h3>
        </div>
        <div className="modal__divider" />
        <div className="modal__body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <div className="modal__form">
                    {fields.map(({ type, name, placeholder, title }) => {
                      return (
                        <div className="modal__form-el">
                          <p className="modal__form-el-label">{title}</p>
                          <Field
                            className="modal__form-el-field"
                            key={name}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="modal__buttons">
                    <button
                      onClick={handleClose}
                      className="modal__buttons-btn modal__buttons-btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="modal__buttons-btn modal__buttons-btn-primary"
                    >
                      {submitText}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </BSModal.Body>
    </BSModal>
  );
}
