import { useParams } from 'react-router-dom';
// import { Ticket as TicketIcon } from 'icons';
import { Reply as ReplyIcon } from 'icons';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, List, Button } from 'antd';
import { useState } from 'react';
import * as Yup from 'yup';

import { getTicketById, addTicketReplies, addTicketComments } from 'store';
import { Button as CustomButton, Input } from 'components';
import { genrateFirstLetterName } from 'lib';

const initialValues = {
  commentText: '',
};

const initialRepliesValues = {
  commentText: '',
};

const validationSchema = Yup.object().shape({
  commentText: Yup.string().required('Comment text is required'),
});

const validationSchemaReplies = Yup.object().shape({
  commentText: Yup.string().required('Comment text is required'),
});

export const Comments = () => {
  const [selected, setSelected] = useState([]);

  const { commentLoading } = useSelector((state) => state?.ticketComments);
  const { repliesLoading } = useSelector((state) => state?.ticketReplies);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const { id } = useParams();
  const dispatch = useDispatch();

  const { ticket } = useSelector((state) => state?.tickets);

  // Dropdown Menu
  const menu = (
    <>
      {['Send', 'Save'].map((el) => {
        return (
          <Button onClick={() => {}} loading={commentLoading}>
            {el}
          </Button>
        );
      })}
    </>
  );

  return (
    <>
      <div className={`form ticket-form mt-[20px]`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            const newValues = {
              commentText: values?.commentText,
              ticketId: id,
            };
            (async () => {
              await dispatch(addTicketComments(newValues));
              await dispatch(getTicketById(id));
            })();
          }}
        >
          <Form>
            <div
              className={`relative mb-[32px] items-end ${
                ticket?.ticketStatus > 0 && 'pointer-events-none opacity-30'
              }`}
            >
              <Input
                key={'commentText'}
                name={'commentText'}
                label={''}
                placeholder={'Share Your Comments'}
                type={'textarea'}
                rows={'7'}
              />
              <div className="absolute bottom-5 right-5 gap-[12px]">
                <Dropdown
                  overlay={menu}
                  overlayClassName="custom-table__table-dropdown-overlay"
                  className="custom-table__table-dropdown"
                  destroyPopupOnHide
                  placement="bottomRight"
                  trigger={['click', 'contextMenu']}
                >
                  <CustomButton
                    loading={commentLoading}
                    className="px-[16px] py-[5px] text-[14px] h-[36px]"
                  >
                    Send
                  </CustomButton>
                </Dropdown>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className={'ticket-list-wrap custom-table__table'}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 20,
          }}
          dataSource={ticket?.ticketComments?.filter(
            (comment) => comment?.ticketCommentType === 1
          )}
          footer={''}
          renderItem={(item) => (
            <List.Item key={item.id} actions={''} extra={''}>
              <div
                id={item.id}
                className="p-[20px] border-[1px] rounded-[8px] border-[#323248]"
              >
                <div className={'w-full relative'}>
                  <div className="flex">
                    <div className="image w-[47px] rounded-[5px] overflow-hidden">
                      {item?.userImagePath ? (
                        <img
                          src={item?.userImagePath}
                          alt={item?.userFullName}
                        />
                      ) : (
                        <div className="bg-[#171723] text-[#0BB783]  px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                          {genrateFirstLetterName(item.userFullName)}
                        </div>
                      )}
                    </div>
                    <div className="meta ml-[16px]">
                      <div className="flex align-center">
                        <span className="text-[#fff] text-[16px]">
                          {item?.userFullName}
                        </span>
                        {item.createdBy === ticket.createdBy && (
                          <span className="bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]">
                            AUTHOR
                          </span>
                        )}
                      </div>
                      <div className="text-[#474761] text-[14px]">1 Hour</div>
                    </div>
                  </div>
                  {/* {ticket?.ticketStatus === 0 && (
                    <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                      <NavLink
                        to="#"
                        // onClick={() => handleReplyInput(item.id)}
                        className={'text-[#474761]'}
                      >
                        Delete
                      </NavLink>
                      <NavLink
                        to="#"
                        // onClick={() => handleReplyInput(item.id)}
                        className={'text-[#474761]'}
                      >
                        Pin
                      </NavLink>
                    </div>
                  )} */}
                </div>
                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                  {item?.commentText}
                </div>
                {isSelected(item.id) && (
                  <div className={'reply-box mt-[20px] relative'}>
                    <Formik
                      initialValues={initialRepliesValues}
                      validationSchema={validationSchemaReplies}
                      enableReinitialize
                      onSubmit={async (values) => {
                        const newValues = {
                          commentText: values?.commentText,
                          ticketCommentId: item.id,
                        };
                        (async () => {
                          await dispatch(addTicketReplies(newValues));
                          await dispatch(getTicketById(id));
                          setSelected([]);
                        })();
                      }}
                    >
                      {({ errors, touched }) => {
                        return (
                          <Form>
                            <div className={'relative'}>
                              <Field
                                className="modal__form-el-field"
                                key="commentText"
                                type="text"
                                name="commentText"
                                placeholder="Write Something"
                              />
                              <Button
                                htmlType="submit"
                                loading={repliesLoading}
                                className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent"
                              >
                                <ReplyIcon />
                              </Button>
                            </div>
                            {touched['commentText'] &&
                              errors['commentText'] && (
                                <div className="error mt-[8px]">
                                  {errors['commentText']}
                                </div>
                              )}
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
