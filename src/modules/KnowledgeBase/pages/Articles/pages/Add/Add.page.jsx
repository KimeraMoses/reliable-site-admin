import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

// Custom Modules
import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import { createArticle } from 'store';
import './Add.styles.scss';
import { useEffect } from 'react';
import { getAllArticleCategories } from 'store';

const ConfigurationEditor = ({ editorState, onEditorStateChange, onBlur }) => {
  return (
    <div className="configuration-editor">
      <div className="configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="configuration-editor__container-wrapper"
          editorClassName="configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

const getInputEl = ({ options, name, placeholder, type }) => {
  switch (type) {
    case 'multiselect':
      return (
        <div className="custom-multiselect-kba w-full">
          <MultiSelect name={name} options={options} mode="multiple" />
        </div>
      );
    case 'text':
      return (
        <Field
          name={name}
          placeholder={placeholder}
          className="h-[52px] w-[60%] text-[#92928f] placeholder:text-[#92928f] bg-[transparent] focus-visible:outline-none"
        />
      );
    case 'select':
      return (
        <div className="custom-select-kba w-full">
          <Input
            type={type}
            placeholder={placeholder}
            name={name}
            options={options}
          />
        </div>
      );
    default:
      break;
  }
};

const EmailBodyInput = ({
  touched,
  errors,
  name,
  placeholder,
  type,
  label,
  options,
}) => {
  return (
    <div className="flex gap-[20px] bg-[transparent] items-center border-b-[1px] border-b-[#323248] border-dashed">
      <h6 className="pl-[32px] text-white whitespace-nowrap w-[15%]">
        {label}
      </h6>
      {getInputEl({ options, name, placeholder, type })}
      {touched[name] && errors[name] && (
        <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
          {errors[name]}
        </div>
      )}
    </div>
  );
};

export const Add = () => {
  const initialValues = {
    title: '',
    categories: [],
    visibility: 'public',
    bodyText: '',
    status: 'draft',
    bodyHolder: EditorState.createEmpty(),
    articleStatus: true,
  };

  const validationSchema = Yup.object().shape({
    // title: Yup.string().required('This field is required!'),
    // visibility: Yup.string().required('This field is required!'),
    // body: Yup.string().required('This field is required!'),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllArticleCategories());
  }, []);

  const { loading, articleCategories } = useSelector(
    (state) => state?.articleCategories
  );

  const fields = [
    {
      name: 'title',
      type: 'text',
      label: 'Article Ttitle',
    },
    {
      name: 'categories',
      type: 'multiselect',
      options: articleCategories?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      label: 'Categories',
    },
    {
      name: 'visibility',
      type: 'select',
      label: 'Visibility',
      options: [
        { label: 'Public', value: 0 },
        { label: 'Private', value: 1 },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Draft', value: 0 },
        { label: 'Publish', value: 1 },
      ],
    },
    // {
    //   name: 'articleStatus',
    //   type: 'switch',
    //   label: 'Article Status',
    // },
    // {
    //   name: 'image',
    //   type: 'file',
    //   label: 'Choose Image',
    // },
  ];

  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await dispatch(createArticle(values));
        // navigate('/admin/dashboard/settings/email-templates');
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Spin spinning={loading}>
              <div className="grid grid-cols-[1fr] gap-[20px] px-[32px] py-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] text-[16px]">
                      Create New Article
                    </h6>
                    {/* Other Inputs */}
                    <div className="flex flex-col gap-[2px]">
                      {fields?.map((field, idx) => {
                        return (
                          <EmailBodyInput
                            key={`field-${idx}`}
                            options={field?.options}
                            name={field?.name}
                            label={field?.label}
                            type={field?.type}
                            placeholder={field?.placeholder}
                            touched={touched}
                            errors={errors}
                          />
                        );
                      })}
                    </div>
                    <ConfigurationEditor
                      editorState={values.bodyHolder}
                      onBlur={() => setFieldTouched('bodyText', true)}
                      onEditorStateChange={(state) => {
                        setFieldValue('bodyHolder', state);
                        const currentContentAsHTML = convertToHTML(
                          state.getCurrentContent()
                        );
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
                        ) {
                          setFieldValue('bodyText', '');
                        } else {
                          setFieldValue('bodyText', currentContentAsHTML);
                        }
                      }}
                    />
                    {touched['body'] && errors['body'] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors['body']}
                      </div>
                    )}
                    <div className="p-[32px] pt-[10px]">
                      <Button htmlType="submit" className="w-[fit_content]">
                        Create New Article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
};
