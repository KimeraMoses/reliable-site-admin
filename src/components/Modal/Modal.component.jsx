import { Modal as BSModal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { object } from 'yup';
import { passwordStrength } from 'check-password-strength';
import './Modal.styles.scss';
import { Switch, Checkbox } from 'antd';
import { Fragment } from 'react';

const demoFields = [];

const vSchema = object({});

const iValues = {};

export function Modal({
  show,
  setShow,
  heading,
  fields = demoFields,
  validationSchema = vSchema,
  initialValues = iValues,
  submitText = 'Add',
  cancelButtonText = 'Cancel',
  handleCancel,
  customBody,
  handleSubmit = (values) => console.log(values),
}) {
  const handleClose = () => {
    setShow(false);
  };

  const isCrud = fields?.map((field) => field?.type === 'crud');
  return (
    <BSModal
      show={show}
      onHide={handleClose}
      className={`custom-modal ${
        isCrud.includes(true) ? 'custom-modal__crud' : ''
      }`}
    >
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
            {({ errors, touched, values }) => {
              return (
                <Form>
                  {customBody ? (
                    customBody
                  ) : (
                    <div className="modal__form">
                      {fields.map(
                        ({ type, name, placeholder, title }, index) => {
                          const strength = values?.password
                            ? passwordStrength(values?.password)?.value
                            : 'Password Not Entered Yet!';
                          return (
                            <Fragment key={name}>
                              <div className="modal__form-el" key={name}>
                                <p className="modal__form-el-label">
                                  {type === 'crud' ? '' : title}
                                </p>
                                {/* Switch */}
                                {type === 'switch' ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue },
                                    }) => {
                                      return (
                                        <div className="modal__form-el-switch">
                                          <div className="modal__form-el-switch-container">
                                            <p className="modal__form-el-switch-container-label">
                                              {field?.value
                                                ? 'Enabled'
                                                : 'Disabled'}
                                            </p>
                                            <div>
                                              <Switch
                                                checked={field?.value}
                                                onChange={(e) =>
                                                  setFieldValue(field?.name, e)
                                                }
                                              />
                                            </div>
                                          </div>
                                          {meta.touched && meta.error && (
                                            <div className="error">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : type === 'crud' ? (
                                  // Crud
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue },
                                    }) => {
                                      const nestedValues = [
                                        {
                                          name: 'create',
                                          title: 'Create',
                                          value: field?.value?.create,
                                        },
                                        {
                                          name: 'read',
                                          title: 'Read',
                                          value: field?.value?.read,
                                        },
                                        {
                                          name: 'update',
                                          title: 'Update',
                                          value: field?.value?.update,
                                        },
                                        {
                                          name: 'delete',
                                          title: 'Delete',
                                          value: field?.value?.delete,
                                        },
                                      ];
                                      return (
                                        <div className="modal__form-el-checkbox">
                                          <div className="modal__form-el-checkbox-container">
                                            <div className="modal__form-el-checkbox-container-label">
                                              {title}
                                            </div>
                                            <div className="modal__form-el-checkbox-container-group">
                                              <Checkbox
                                                onChange={(e) => {
                                                  setFieldValue(field?.name, {
                                                    ...field?.value,
                                                    all: e.target.checked,
                                                    create: e.target.checked,
                                                    read: e.target.checked,
                                                    update: e.target.checked,
                                                    delete: e.target.checked,
                                                  });
                                                }}
                                                checked={field?.value?.all}
                                              >
                                                <p className="modal__form-el-checkbox-container-label">
                                                  All
                                                </p>
                                              </Checkbox>
                                              {nestedValues.map(
                                                ({ name, value, title }) => {
                                                  return (
                                                    <div
                                                      key={name}
                                                      className="modal__form-el-checkbox-container-el"
                                                    >
                                                      <Checkbox
                                                        checked={value}
                                                        onChange={(e) =>
                                                          setFieldValue(
                                                            field?.name,
                                                            {
                                                              ...field?.value,
                                                              [name]:
                                                                e.target
                                                                  .checked,
                                                            }
                                                          )
                                                        }
                                                      >
                                                        <p className="modal__form-el-checkbox-container-label">
                                                          {title}
                                                        </p>
                                                      </Checkbox>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : name === 'password' ? (
                                  <div className="modal__form-el-password">
                                    <Field
                                      type="password"
                                      name={name}
                                      placeholder={placeholder}
                                      className="modal__form-el-field"
                                      key={name}
                                    />
                                    <div className="modal__form-el-password-strength">
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === 'Too weak'
                                            ? 'bg-red-600'
                                            : strength === 'Weak'
                                            ? 'bg-yellow-600'
                                            : strength === 'Medium'
                                            ? 'bg-blue-600'
                                            : strength === 'Strong'
                                            ? 'bg-green-600'
                                            : 'bg-[#323248]'
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === 'Weak'
                                            ? 'bg-yellow-600'
                                            : strength === 'Medium'
                                            ? 'bg-blue-600'
                                            : strength === 'Strong'
                                            ? 'bg-green-600'
                                            : 'bg-[#323248]'
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === 'Medium'
                                            ? 'bg-blue-600'
                                            : strength === 'Strong'
                                            ? 'bg-green-600'
                                            : 'bg-[#323248]'
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === 'Strong'
                                            ? 'bg-green-600'
                                            : 'bg-[#323248]'
                                        }`}
                                      />
                                    </div>
                                    <div className="modal__form-el-password-strength-text">
                                      Use 8 or more characters with a mix of
                                      letters, numbers & symbols.
                                    </div>
                                    {touched[name] && errors[name] && (
                                      <div className="error">
                                        {errors[name]}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    <Field
                                      className="modal__form-el-field"
                                      key={name}
                                      type={type}
                                      name={name}
                                      placeholder={placeholder}
                                    />
                                    {touched[name] && errors[name] && (
                                      <div className="error">
                                        {errors[name]}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              {type === 'crud' && fields?.length > index + 1 ? (
                                <div className="modal__crud-divider" />
                              ) : (
                                <></>
                              )}
                            </Fragment>
                          );
                        }
                      )}
                    </div>
                  )}
                  <div className="modal__buttons">
                    <button
                      onClick={handleCancel ? handleCancel : handleClose}
                      type="button"
                      className="modal__buttons-btn modal__buttons-btn-secondary"
                    >
                      {cancelButtonText}
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
