import { Modal as BSModal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { object } from 'yup';
import { passwordStrength } from 'check-password-strength';
import './Modal.styles.scss';
import { Switch, Button } from 'antd';
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
  additionalBody,
  loading,
  disableSubmit,
  handleSubmit = (values) => console.log(values),
}) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <BSModal show={show} onHide={handleClose} className={`custom-modal`}>
      <BSModal.Body className="modal__bg">
        <div className="modal__header">
          <h3>{heading}</h3>
        </div>
        <div className="modal__divider" />
        <div className="modal__body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
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
                        (
                          { type, name, placeholder, title, options },
                          index
                        ) => {
                          const strength = values?.password
                            ? passwordStrength(values?.password)?.value
                            : 'Password Not Entered Yet!';
                          return (
                            <Fragment key={name}>
                              <div className="modal__form-el" key={name}>
                                <p className="modal__form-el-label">{title}</p>
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
                                ) : // Select
                                type === 'select' ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue },
                                    }) => {
                                      return (
                                        <div className="w-full">
                                          <select
                                            onChange={(e) =>
                                              setFieldValue(
                                                name,
                                                e.target.value
                                              )
                                            }
                                            className="form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
                                          >
                                            {options?.map((option) => (
                                              <option
                                                value={option?.value}
                                                key={option?.value}
                                              >
                                                {option?.label}
                                              </option>
                                            ))}
                                          </select>
                                          {meta.touched && meta.error && (
                                            <div className="error">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
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
                            </Fragment>
                          );
                        }
                      )}
                    </div>
                  )}
                  {additionalBody ? additionalBody : <></>}
                  <div className="modal__buttons">
                    <button
                      onClick={handleCancel ? handleCancel : handleClose}
                      type="button"
                      className="modal__buttons-btn modal__buttons-btn-secondary"
                    >
                      {cancelButtonText}
                    </button>
                    <Button
                      htmlType="submit"
                      loading={loading}
                      className="modal__buttons-btn modal__buttons-btn-primary"
                      disabled={disableSubmit}
                    >
                      {submitText}
                    </Button>
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
