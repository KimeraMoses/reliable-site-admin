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

const CommentCard = ({ imgSrc, imgTxt, author, isActive, reply }) => {
  return (
    <>
      <div
        className={` ${
          reply
            ? 'p-[20px] border-[#323248] border-[1px] border-solid rounded-[8px] ml-[40px]'
            : 'p-[20px] border-[#323248] border-[1px] border-solid rounded-[8px]'
        }`}
      >
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
          <div
            className={`
              ${
                isActive
                  ? 'text-base text-[#3699FF] cursor-pointer'
                  : 'text-base text-[#474761] cursor-pointer'
              }
            `}
          >
            Reply
          </div>
        </div>
        <div className="mt-[20px]">
          <p className=" text-base text-[#92928F]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>
        {isActive && (
          <div className="mt-[20px]">
            <Formik
              initialValues={{
                writeSometing: '',
              }}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="">
                    <div className="relative">
                      <Input
                        type="text"
                        name="text"
                        placeholder="write Something"
                      />
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8ZyBpZD0idnVlc2F4X2J1bGtfc2VuZC0yIiBkYXRhLW5hbWU9InZ1ZXNheC9idWxrL3NlbmQtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwMCAtMzE2KSI+CiAgICA8ZyBpZD0ic2VuZC0yIj4KICAgICAgPHBhdGggaWQ9IlZlY3RvciIgZD0iTTQuNTU0LDMuNDA3LDEzLjU3NC40YzQuMDUtMS4zNSw2LjI1Ljg2LDQuOTEsNC45MWwtMy4wMSw5LjAyYy0yLjAyLDYuMDctNS4zNCw2LjA3LTcuMzYsMGwtLjg5LTIuNjgtMi42OC0uODlDLTEuNTE2LDguNzQ3LTEuNTE2LDUuNDM3LDQuNTU0LDMuNDA3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAyLjU1NiAzMTguNTUzKSIgZmlsbD0iIzM2OTlmZiIgb3BhY2l0eT0iMC40Ii8+CiAgICAgIDxwYXRoIGlkPSJWZWN0b3ItMiIgZGF0YS1uYW1lPSJWZWN0b3IiIGQ9Ik0wLDMuODIsMy44MSwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTIuMTIgMzIzLjgxKSIgZmlsbD0iIzM2OTlmZiIvPgogICAgICA8cGF0aCBpZD0iVmVjdG9yLTMiIGRhdGEtbmFtZT0iVmVjdG9yIiBkPSJNLjc0Nyw1LjMxOGEuNzQyLjc0MiwwLDAsMS0uNTMtLjIyLjc1NC43NTQsMCwwLDEsMC0xLjA2bDMuOC0zLjgyYS43NS43NSwwLDAsMSwxLjA2LDEuMDZMMS4yNzcsNS4xQS43ODYuNzg2LDAsMCwxLC43NDcsNS4zMThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTEuMzcyIDMyMy4wNjMpIiBmaWxsPSIjMzY5OWZmIi8+CiAgICAgIDxwYXRoIGlkPSJWZWN0b3ItNCIgZGF0YS1uYW1lPSJWZWN0b3IiIGQ9Ik0wLDBIMjRWMjRIMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMCAzMTYpIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
                        alt="send"
                        className="absolute cursor-pointer bottom-[14px] right-[14px]"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
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

            <CommentCard imgTxt="P" reply />
            <CommentCard imgTxt="P" isActive />
          </div>
        </div>
      </Spin>
    </>
  );
};
