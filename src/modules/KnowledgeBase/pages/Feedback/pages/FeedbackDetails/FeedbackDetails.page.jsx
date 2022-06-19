import { Formik, Form } from 'formik';
import { Spin } from 'antd';
import { Button as AntButton } from 'antd';
import moment from 'moment';
// Custom Modules
import { Input, Button } from 'components';
import './FeedbackDetails.styles.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleByID } from 'store';
import { getArticleFeedbackByID } from 'store';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticleFeedbackCommentReply } from 'store/Actions/articleFeedbackCommentReplies';
import { getUsers } from 'store';
import { createTicket } from 'store';
import { toast } from 'react-toastify';
import { createArticleFeedbackComment } from 'store/Actions/articleFeedbackComments';

const CommentCard = ({
  imgSrc,
  imgTxt,
  reply,
  commentText,
  userFullName,
  createdOn,
  id,
}) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
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
                className="w-[48px] h-[48px] object-cover rounded-[8px]"
              />
            )}
            {imgTxt && (
              <p className="w-[48px] h-[48px] flex items-center justify-center bg-[#171723] text-[#0BB783] rounded-[8px]">
                {imgTxt}
              </p>
            )}

            <div className="flex flex-col gap-[4px]">
              <div className="flex gap-[8px]">
                <h5 className="text-sm text-[#FFFFFF]">
                  {userFullName || 'Anonymous'}
                </h5>
                {/* {author && (
                  <p className="bg-[#3A2434] py-[4px] px-[8px] text-[#F64E60] rounded-[8px] text-xs">
                    Author
                  </p>
                )} */}
              </div>
              <p className="text-xs text-[#474761]">
                {createdOn
                  ? moment(createdOn)?.format('MMM, DD, YYYY [at] h:mm A')
                  : null}
              </p>
            </div>
          </div>
          {!reply && (
            <div
              className={`cursor-pointer text-base hover:text-[#3699FF]
              ${active ? 'text-[#3699FF]' : 'text-[#474761]'}
            `}
              onClick={() => setActive(true)}
            >
              Reply
            </div>
          )}
        </div>
        <div className="mt-[20px]">
          <p className=" text-base text-[#92928F]">{commentText}</p>
        </div>
        {active && (
          <div className="mt-[20px]">
            <Formik
              initialValues={{
                commentText: '',
              }}
              onSubmit={async (values) => {
                dispatch(
                  createArticleFeedbackCommentReply({
                    // articleFeedbackId: params?.id,
                    commentText: values?.commentText,
                    // articleFeedbackCommentParentReplyId:
                    //   '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    articleFeedbackCommentId: id,
                  })
                );
                await dispatch(getArticleByID({ id: params?.articleId }));
                await dispatch(getArticleFeedbackByID({ id: params?.id }));
                setActive(false);
              }}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="">
                    <div className="relative">
                      <Input
                        type="text"
                        name="commentText"
                        placeholder="Write Something"
                      />
                      <AntButton
                        htmlType="submit"
                        className="border-none flex items-center justify-center absolute right-[14px] top-[50%] translate-y-[-50%] cursor-pointer p-[0px] hover:bg-[transparent] active:bg-[transparent] focus:bg-[transparent]"
                      >
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8ZyBpZD0idnVlc2F4X2J1bGtfc2VuZC0yIiBkYXRhLW5hbWU9InZ1ZXNheC9idWxrL3NlbmQtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwMCAtMzE2KSI+CiAgICA8ZyBpZD0ic2VuZC0yIj4KICAgICAgPHBhdGggaWQ9IlZlY3RvciIgZD0iTTQuNTU0LDMuNDA3LDEzLjU3NC40YzQuMDUtMS4zNSw2LjI1Ljg2LDQuOTEsNC45MWwtMy4wMSw5LjAyYy0yLjAyLDYuMDctNS4zNCw2LjA3LTcuMzYsMGwtLjg5LTIuNjgtMi42OC0uODlDLTEuNTE2LDguNzQ3LTEuNTE2LDUuNDM3LDQuNTU0LDMuNDA3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAyLjU1NiAzMTguNTUzKSIgZmlsbD0iIzM2OTlmZiIgb3BhY2l0eT0iMC40Ii8+CiAgICAgIDxwYXRoIGlkPSJWZWN0b3ItMiIgZGF0YS1uYW1lPSJWZWN0b3IiIGQ9Ik0wLDMuODIsMy44MSwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTIuMTIgMzIzLjgxKSIgZmlsbD0iIzM2OTlmZiIvPgogICAgICA8cGF0aCBpZD0iVmVjdG9yLTMiIGRhdGEtbmFtZT0iVmVjdG9yIiBkPSJNLjc0Nyw1LjMxOGEuNzQyLjc0MiwwLDAsMS0uNTMtLjIyLjc1NC43NTQsMCwwLDEsMC0xLjA2bDMuOC0zLjgyYS43NS43NSwwLDAsMSwxLjA2LDEuMDZMMS4yNzcsNS4xQS43ODYuNzg2LDAsMCwxLC43NDcsNS4zMThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTEuMzcyIDMyMy4wNjMpIiBmaWxsPSIjMzY5OWZmIi8+CiAgICAgIDxwYXRoIGlkPSJWZWN0b3ItNCIgZGF0YS1uYW1lPSJWZWN0b3IiIGQ9Ik0wLDBIMjRWMjRIMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMCAzMTYpIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
                          alt="send"
                        />
                      </AntButton>
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
  const dispatch = useDispatch();
  const { articleId, id } = useParams();
  useEffect(() => {
    (async () => {
      await dispatch(getArticleByID({ id: articleId }));
      await dispatch(getArticleFeedbackByID({ id }));
      await dispatch(getUsers());
    })();
  }, []);

  const { article, loading } = useSelector((state) => state?.articles);
  const { articlesFeedback } = useSelector((state) => state?.articlesFeedback);
  const { users } = useSelector((state) => state?.users);
  let usersData = [{ value: '', label: 'Select' }];
  users.forEach((user) => {
    usersData.push({
      value: user?.id,
      label: user?.fullName,
    });
  });
  const feedbackLoading = useSelector(
    (state) => state?.articlesFeedback?.loading
  );
  const ticketLoading = useSelector((state) => state?.tickets?.loading);

  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  return (
    <>
      <Spin spinning={loading || feedbackLoading || ticketLoading}>
        <div className="m-[40px] p-[32px] bg-[#1E1E2D] rounded-[8px]">
          <div className="flex gap-[12px]">
            {article?.imagePath && !imgError ? (
              <img
                className="w-[90px] rounded-[8px] object-cover"
                onError={() => setImgError(true)}
                src={article?.imagePath}
                alt={article?.title}
              />
            ) : (
              <div className="w-[90px] rounded-[8px] object-cover border-1 border-blue-600 flex items-center justify-center text-white text-[16px] font-medium">
                No Image
              </div>
            )}
            <div className="flex flex-col gap-[8px] ">
              <p className="text-[24px] text-[#FFFFFF] ">
                {article?.title || 'No Title'}
              </p>
              <p className="text-[#474761] text-[14px]">
                Created On{' '}
                {articlesFeedback?.createdOn
                  ? moment(articlesFeedback?.createdOn).format('MM/DD/YYYY')
                  : 'N/A'}
              </p>
            </div>
          </div>
          <Formik
            initialValues={{
              assignTo: '',
              status: 0,
              priority: 0,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              if (values?.assignTo) {
                const final = {
                  assignedTo: values?.assignTo,
                  ticketStatus: Number(values?.status),
                  ticketPriority: Number(values?.priority),
                  ticketTitle: `Ticket for Article Feedback`,
                  description: 'Demo Description for Ticket',
                  ticketRelatedTo: 0,
                  ticketRelatedToId: id,
                  departmentId: '641de550-d0e3-458d-b842-0e7461a8301a',
                };
                await dispatch(createTicket({ data: final }));
                navigate('/admin/dashboard/tickets/list/show');
              } else {
                toast.error('Please select appropriate values.');
              }
            }}
          >
            {() => {
              return (
                <Form>
                  <div className="flex justify-between gap-[40px] mt-[40px]">
                    {article?.bodyText ? (
                      <p
                        className="text-base text-[#FFFFFF]"
                        dangerouslySetInnerHTML={{ __html: article?.bodyText }}
                      />
                    ) : (
                      <p className="text-base text-[#FFFFFF]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat voluptatem numquam labore illum quo pariatur
                        tenetur perferendis quaerat dolore? Cum consequatur
                        voluptatem, aliquid quis delectus provident eius facilis
                        eos officiis?
                      </p>
                    )}
                    <Button
                      type="ghost"
                      htmlType="submit"
                      className="w-[fit_content] h-[55px]"
                    >
                      Generate Ticket
                    </Button>
                  </div>
                  <div className="mt-[40px] grid grid-cols-3 gap-[16px]">
                    <Input
                      options={usersData}
                      type="select"
                      name="assignTo"
                      label="Assign To"
                    />
                    <Input
                      options={[
                        { label: 'Active', value: 0 },
                        { label: 'Closed', value: 1 },
                        { label: 'Disabled', value: 2 },
                      ]}
                      type="select"
                      name="status"
                      label="Status"
                    />
                    <Input
                      options={[
                        { label: 'Urgent', value: 0 },
                        { label: 'Not Urgent', value: 1 },
                      ]}
                      type="select"
                      name="priority"
                      label="Priority"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div>
            <Formik
              initialValues={{
                commentText: '',
              }}
              onSubmit={async (values) => {
                if (!values?.commentText) {
                  toast.error('You must write something to send.');
                } else {
                  const final = {
                    articleFeedbackId: id,
                    commentText: values?.commentText,
                  };
                  dispatch(createArticleFeedbackComment(final));
                  await dispatch(getArticleByID({ id: articleId }));
                  await dispatch(getArticleFeedbackByID({ id }));
                }
              }}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="grid grid-cols-3 gap-[16px]">
                    <div className="relative col-span-3 mt-[24px]">
                      <Input
                        type="textarea"
                        name="commentText"
                        placeholder="Share Your Knowledge"
                        rows={10}
                      />
                      <Button
                        htmlType="submit"
                        className="absolute bottom-[16px] right-[16px]"
                      >
                        Send
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="mt-[40px] flex flex-col gap-[20px]">
            {articlesFeedback?.articleFeedbackComments?.map((comment) => {
              const image = comment?.userImagePath;
              const fullName = comment?.userFullName;
              return (
                <>
                  <CommentCard
                    imgTxt={
                      !image && !fullName
                        ? 'A'
                        : !image && fullName
                        ? fullName
                        : ''
                    }
                    imgSrc={image}
                    {...comment}
                  />
                  {comment?.articleFeedbackCommentReplies ? (
                    comment?.articleFeedbackCommentReplies?.map((reply) => {
                      return (
                        <CommentCard
                          imgTxt={
                            !image && !fullName
                              ? 'A'
                              : !image && fullName
                              ? fullName
                              : ''
                          }
                          imgSrc={image}
                          reply
                          {...reply}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
            {/* <CommentCard imgTxt="P" />
            <CommentCard imgSrc="/article.jpg" author />

            <CommentCard imgTxt="P" reply />
            <CommentCard imgTxt="P" /> */}
          </div>
        </div>
      </Spin>
    </>
  );
};