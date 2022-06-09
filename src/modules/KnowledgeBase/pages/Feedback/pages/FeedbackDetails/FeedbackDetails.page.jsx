import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

// Custom Modules
import { Input, MultiSelect, SMTPEditor, Button } from 'components';
import { addEmailTemplate } from 'store';
import './FeedbackDetails.styles.scss';

const CommentCard = ({ imgSrc, imgTxt, author }) => {
  return (
    <>
      <div className="p-[20px] border-[#323248] border-[1px] border-solid rounded-[8px]">
        <div className="flex justify-between">
          <div className="flex gap-[16px]">
            {imgSrc && (
              <img
                src={imgSrc}
                alt="detail"
                className="w-[48px] rounded-[8px]"
              />
            )}
            {imgTxt && (
              <p className="py-[10px] px-[18px] bg-[#171723] text-[#0BB783] rounded-[8px]">
                {imgTxt}
              </p>
            )}

            <div className="flex flex-col gap-[4px]">
              <div className="flex gap-[8px]">
                <h5 className="text-sm text-[#FFFFFF]">Paul Elliot</h5>
                {author && (
                  <p className="bg-[#3A2434] py-[4px] px-[8px] text-[#F64E60] rounded-[8px] text-xs">
                    Author
                  </p>
                )}
              </div>
              <p className="text-xs text-[#474761]">1 hour</p>
            </div>
          </div>
          <div className="text-base text-[#474761]">Reply</div>
        </div>
        <div className="mt-[20px]">
          <p className=" text-base text-[#92928F]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>
      </div>
    </>
  );
};

export const FeedbackDetails = () => {
  return (
    <>
      <Spin spinning={false}>
        <div className="m-[40px] p-[32px] bg-[#1E1E2D] rounded-[8px]">
          <div className="flex gap-[12px]">
            <img
              className="w-[90px] rounded-[8px]"
              src="/article.jpg"
              alt="article title"
            />
            <div className="flex flex-col gap-[8px] ">
              <p className="text-[24px] text-[#FFFFFF] ">Article Title</p>
              <p className="text-[#474761] text-[14px]">
                By Paul Elliott On Feb 20th, 2022
              </p>
            </div>
          </div>
          <div className="flex gap-[40px] mt-[40px]">
            <p className="text-base text-[#FFFFFF] ">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
            <Button
              type="ghost"
              htmlType="submit"
              className="w-[fit_content] h-[55px]"
            >
              Generate Ticket
            </Button>
          </div>
          <div className="mt-[40px]">
            <Formik
              initialValues={{
                assignTo: '',
                status: '',
                priority: '',
                shareKnowledge: '',
              }}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="grid grid-cols-3 gap-[16px]">
                    <Input
                      options={[
                        { label: 'Paul Elliot', value: 'Paul' },
                        { label: 'Beri Sela', value: 'Sela' },
                      ]}
                      type="select"
                      name="assignTo"
                      label="Assign To"
                    />
                    <Input
                      options={[
                        { label: 'Pending', value: 'pending' },
                        { label: 'Confirmed', value: 'Confirmed' },
                      ]}
                      type="select"
                      name="status"
                      label="Status"
                    />
                    <Input
                      options={[
                        { label: 'Urgent', value: 'Urgent' },
                        { label: 'Not Urgent', value: 'Not Urgent' },
                      ]}
                      type="select"
                      name="priority"
                      label="Priority"
                    />
                    <div className="relative col-span-3 mt-[24px]">
                      <Input
                        type="textarea"
                        name="shareKnowledge"
                        placeholder="Share Your Knowledge"
                        rows={10}
                      />
                      <Button className="absolute bottom-[16px] right-[16px]">
                        Send
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="mt-[40px] flex flex-col gap-[20px]">
            <CommentCard imgTxt="P" />
            <CommentCard imgSrc="/article.jpg" author />
            <div className="ml-[40px]">
              <CommentCard imgTxt="P" />
            </div>
          </div>
        </div>
      </Spin>
    </>
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={validationSchema}
    //   enableReinitialize
    //   onSubmit={async (values) => {
    //     await dispatch(addEmailTemplate({ data: values }));
    //     navigate('/admin/dashboard/settings/email-templates');
    //   }}
    // >
    //   {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
    //     return (
    //       <Form>
    //         {/* TODO: Change Spinning When Integration */}
    //         <Spin spinning={false}>
    //           <div className="grid grid-cols-[1fr] gap-[20px] px-[32px] py-[40px]">
    //             <div className="flex flex-col gap-[20px]">
    //               <div className="bg-[#1E1E2D] rounded-[8px]">
    //                 <h6 className="text-white font-medium p-[32px] text-[16px]">
    //                   Submission Details
    //                 </h6>
    //                 {/* Other Inputs */}
    //                 <div className="flex flex-col gap-[2px]">
    //                   {fields?.map((field, idx) => {
    //                     return (
    //                       <EmailBodyInput
    //                         key={`field-${idx}`}
    //                         options={field?.options}
    //                         name={field?.name}
    //                         label={field?.label}
    //                         type={field?.type}
    //                         placeholder={field?.placeholder}
    //                         touched={touched}
    //                         errors={errors}
    //                       />
    //                     );
    //                   })}
    //                 </div>
    //                 <ConfigurationEditor
    //                   editorState={values.bodyHolder}
    //                   onBlur={() => setFieldTouched('body', true)}
    //                   onEditorStateChange={(state) => {
    //                     setFieldValue('bodyHolder', state);
    //                     const currentContentAsHTML = convertToHTML(
    //                       state.getCurrentContent()
    //                     );
    //                     if (
    //                       convertToRaw(state.getCurrentContent()).blocks
    //                         .length === 1 &&
    //                       convertToRaw(state.getCurrentContent()).blocks[0]
    //                         .text === ''
    //                     ) {
    //                       setFieldValue('body', '');
    //                     } else {
    //                       setFieldValue('body', currentContentAsHTML);
    //                     }
    //                   }}
    //                 />
    //                 {touched['body'] && errors['body'] && (
    //                   <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
    //                     {errors['body']}
    //                   </div>
    //                 )}
    //                 <div className="p-[32px] pt-[10px] flex items-center gap-[16px]">
    //                   <Button htmlType="submit" className="w-[fit_content]">
    //                     Approve Submission
    //                   </Button>
    //                   <Button
    //                     type="ghost"
    //                     htmlType="submit"
    //                     className="w-[fit_content]"
    //                   >
    //                     Generate Ticket
    //                   </Button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </Spin>
    //       </Form>
    //     );
    //   }}
    // </Formik>
  );
};
