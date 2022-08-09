import { NavLink, useParams } from "react-router-dom";
// import { Ticket as TicketIcon } from 'icons';
import { Reply as ReplyIcon } from "icons";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, List, Button, Popconfirm } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import moment from "moment";
import {
  getTicketById,
  addTicketReplies,
  addTicketComments,
  editTicket,
} from "store";
import { Button as CustomButton, Input, FollowUp } from "components";
import { genrateFirstLetterName } from "lib";
import { deleteComment } from "store";
import { setTicketCommentLoading } from "store";
import { updateTicketComments } from "store";

const CustomSelectUpdate = ({
  label,
  name,
  options,
  value,
  disabled,
  onChange,
  className,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={name} className="mb-[16px] text-white text-[14px]">
        {label}
      </label>
      <select
        name={name}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        className="form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
      >
        {options?.map((option) => (
          <option value={option?.value} key={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const initialValues = {
  commentText: "",
};

const initialRepliesValues = {
  commentText: "",
};

const validationSchema = Yup.object().shape({
  commentText: Yup.string().required("Comment text is required"),
});

const validationSchemaReplies = Yup.object().shape({
  commentText: Yup.string().required("Comment text is required"),
});

export const Communication = () => {
  const { t } = useTranslation("/Tickets/ns");
  const [selected, setSelected] = useState([]);

  const { commentLoading } = useSelector((state) => state?.ticketComments);
  const { repliesLoading } = useSelector((state) => state?.ticketReplies);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const { departmentUsers } = useSelector((state) => state?.departments);
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log(departmentUsers);

  const { ticket } = useSelector((state) => state?.tickets);

  // console.log("ticket", ticket);

  const commentSource = ticket?.ticketComments?.filter(
    (comment) => comment?.ticketCommentType === 0 && !comment?.isDraft
  );
  const finalComments = commentSource?.sort(
    (a, b) => Number(b?.isSticky) - Number(a?.isSticky)
  );

  const fields = [
    {
      name: "assignedTo",
      label: t("assignTo"),
      type: "select",
      value: ticket?.assignedTo,
      options: () => {
        let usersData = [{ value: "", label: "Select" }];
        departmentUsers?.forEach((user) => {
          usersData.push({
            value: user?.id,
            label: user?.fullName,
          });
        });
        return usersData;
      },
    },
    {
      name: "ticketStatus",
      label: t("status"),
      type: "select",
      value: ticket?.ticketStatus,
      options: () =>
        ["Active", "Waiting", "Closed", "Closed and Locked"]?.map(
          (el, idx) => ({
            label: el,
            value: idx,
          })
        ),
    },
    {
      name: "ticketPriority",
      label: t("priority"),
      type: "select",
      value: ticket?.ticketPriority,
      options: () =>
        ["Low", "Normal", "High"].map((el, idx) => ({
          label: el,
          value: idx,
        })),
    },
  ];

  // Ticket Data
  const ticketData = [
    { title: "Ticket #", value: ticket?.ticketNumber },
    {
      title: "Client Email",
      value: ticket?.clientEmail,
    },
    {
      title: "Client Full Name",
      value: ticket?.clientFullName,
    },
    { title: "Product / Service", value: ticket?.product },
    { title: "Brand", value: ticket?.brand?.name },
    { title: "Department", value: ticket?.department?.name },
    // { title: "Idle", value: ticket?.idleTime },
    // { title: "Duration", value: ticket?.duration },
    {
      title: "Idle",
      value: `${moment(ticket?.lastModifiedOn).format(
        "HH:mm:ss"
      )} since modified`,
    },
    {
      title: "Duration",
      value: `${moment(ticket?.createdOn).format("HH:mm:ss")} since created`,
    },
    {
      title: "Assigned To",
      value: ticket?.assignedToFullName,
    },
    {
      title: "Number of Messages",
      value: ticket?.ticketComments?.length || "0",
    },
  ];
  // Ticket Data

  const handleReplyInput = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleUpdateTicket = (e) => {
    if (e.target.value !== "") {
      const newValues = {
        ...ticket,
      };
      if (e.target.name === "assignedTo") {
        newValues[e.target.name] = e.target.value;
      } else if (e.target.name === "ticketStatus") {
        newValues[e.target.name] = parseInt(e.target.value);
      } else {
        newValues[e.target.name] = parseInt(e.target.value);
      }
      (async () => {
        await dispatch(editTicket({ data: newValues }));
        await dispatch(getTicketById(ticket?.id));
      })();
    }
  };
  // Follow-Up Modal
  const [showFollowUp, setShowFollowUp] = useState(false);

  return (
    <>
      <FollowUp show={showFollowUp} setShow={setShowFollowUp} />
      <div className="mt-[40px] grid grid-cols-3 gap-[32px]">
        {ticketData?.map((data) => {
          return (
            <div className="flex items-center gap-[12px]">
              <div className="text-[16px] text-[#474761]">{data?.title}:</div>
              <div className={"text-[14px]"}>
                {data?.value ? data?.value : "N/A"}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"text-[14px] mt-[40px] mb-[40px]"}>
        <div className="flex items-center gap-[12px]">
          <div className="text-[16px] text-[#474761]">Description:</div>
          <div className={"text-[14px]"}>{ticket?.description}</div>
        </div>
      </div>
      <div className={`form ticket-form `}>
        <div className="grid grid-cols-3 gap-[20px] mb-[32px] items-end">
          {fields.map((field) => (
            <div className="flex items-end" key={field?.name}>
              <CustomSelectUpdate
                key={field.name}
                name={field.name}
                label={field?.label}
                placeholder={field.placeholder}
                type={field.type}
                options={field.options()}
                className={"custom-select"}
                value={field.value}
                onChange={(e) => handleUpdateTicket(e)}
              />
            </div>
          ))}
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {}}
        >
          {({ values }) => (
            <Form>
              <div
                className={`relative mb-[32px] items-end ${
                  ticket?.ticketStatus > 0 && "pointer-events-none opacity-30"
                }`}
              >
                <Input
                  key={"commentText"}
                  name={"commentText"}
                  label={""}
                  placeholder={"Share Your Comments"}
                  type={"textarea"}
                  rows={"7"}
                />
                <div className="absolute bottom-5 right-5 flex items-center gap-[12px]">
                  <Dropdown
                    overlay={
                      <>
                        {[
                          "Send and Mark Active",
                          "Send and Mark Waiting",
                          "Send and Mark Closed",
                          "Send and Mark Closed & Locked",
                        ].map((el, idx) => {
                          return (
                            <Button
                              onClick={async () => {
                                const newValues = {
                                  commentText: values?.commentText,
                                  ticketId: ticket?.id,
                                  isSticky: false,
                                  isDraft: false,
                                  ticketCommentType: 0,
                                  ticketCommentAction: 0,
                                };
                                await dispatch(addTicketComments(newValues));
                                dispatch(setTicketCommentLoading(true));
                                await dispatch(
                                  editTicket({
                                    data: { ...ticket, ticketStatus: idx },
                                  })
                                );
                                await dispatch(getTicketById(ticket?.id, true));
                                dispatch(setTicketCommentLoading(false));
                              }}
                              loading={commentLoading}
                            >
                              {el}
                            </Button>
                          );
                        })}
                      </>
                    }
                    overlayClassName="custom-table__table-dropdown-overlay"
                    className="custom-table__table-dropdown"
                    destroyPopupOnHide
                    placement="bottomRight"
                    trigger={["click", "contextMenu"]}
                  >
                    <CustomButton
                      loading={commentLoading}
                      className="px-[16px] py-[5px] text-[14px] h-[36px]"
                    >
                      Send
                    </CustomButton>
                  </Dropdown>
                  <CustomButton
                    loading={commentLoading}
                    onClick={async () => {
                      const newValues = {
                        commentText: values?.commentText,
                        ticketId: ticket?.id,
                        isSticky: false,
                        isDraft: true,
                        ticketCommentType: 0,
                      };
                      await dispatch(addTicketComments(newValues));
                      dispatch(setTicketCommentLoading(true));
                      await dispatch(getTicketById(ticket?.id, true));
                      dispatch(setTicketCommentLoading(false));
                    }}
                    className="px-[16px] py-[5px] text-[14px] h-[36px]"
                  >
                    Save as Draft
                  </CustomButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={"ticket-list-wrap custom-table__table"}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 20,
          }}
          dataSource={finalComments}
          footer={""}
          renderItem={(item) => (
            <List.Item key={item.id} actions={""} extra={""}>
              <div
                id={item.id}
                className="p-[20px] border-[1px] rounded-[8px] border-[#323248]"
              >
                <div className={"w-full relative"}>
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
                  {ticket?.ticketStatus === 0 && (
                    <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                      <NavLink
                        to="#"
                        onClick={() => handleReplyInput(item.id)}
                        className={"text-[#474761]"}
                      >
                        Reply
                      </NavLink>
                      <Popconfirm
                        okButtonProps={{
                          className: "bg-[#40a9ff]",
                        }}
                        title="Are you sure you want to delete this comment?"
                        onConfirm={async () => {
                          await dispatch(deleteComment({ id: item?.id }));
                          dispatch(setTicketCommentLoading(true));
                          await dispatch(getTicketById(ticket?.id, true));
                          dispatch(setTicketCommentLoading(false));
                        }}
                      >
                        <div
                          className={
                            "text-[#474761] cursor-pointer hover:text-[#40a9ff]"
                          }
                        >
                          Delete
                        </div>
                      </Popconfirm>
                      <NavLink
                        to="#"
                        onClick={async () => {
                          await dispatch(
                            updateTicketComments({
                              data: {
                                ...item,
                                isSticky: !item?.isSticky,
                              },
                            })
                          );
                          dispatch(setTicketCommentLoading(true));
                          await dispatch(getTicketById(ticket?.id, true));
                          dispatch(setTicketCommentLoading(false));
                        }}
                        className={
                          item?.isSticky ? "text-[#40a9ff]" : "text-[#474761]"
                        }
                      >
                        {item?.isSticky ? "Unpin" : "Pin"}
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                  {item?.commentText}
                </div>
                {isSelected(item.id) && (
                  <div className={"reply-box mt-[20px] relative"}>
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
                      {({ errors, touched, values }) => {
                        return (
                          <Form>
                            <div className={"relative"}>
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
                            {touched["commentText"] &&
                              errors["commentText"] && (
                                <div className="error mt-[8px]">
                                  {errors["commentText"]}
                                </div>
                              )}
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                )}
              </div>
              <div className="ml-[40px]">
                {item?.ticketCommentReplies.map((data, i) => (
                  <div
                    key={i}
                    id={data?.id}
                    className="p-[20px] border-[1px] rounded-[8px] mt-[20px] border-[#323248]"
                  >
                    <div className={"w-full relative"}>
                      <div className="flex">
                        <div className="image w-[47px] rounded-[5px] overflow-hidden">
                          {data?.userImagePath ? (
                            <img
                              src={item?.userImagePath}
                              alt={data?.userFullName}
                            />
                          ) : (
                            <div className="bg-[#171723] text-[#0BB783] px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                              {genrateFirstLetterName(data?.userFullName)}
                            </div>
                          )}
                        </div>
                        <div className="meta ml-[16px]">
                          <div className="flex align-center">
                            <span className="text-[#fff] text-[16px]">
                              {data?.userFullName}
                            </span>
                            <span className="bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]">
                              AUTHOR
                            </span>
                          </div>
                          <div className="text-[#474761] text-[14px]">
                            1 Hour
                          </div>
                        </div>
                      </div>
                      {ticket?.ticketStatus === 0 && (
                        <NavLink
                          to="#"
                          onClick={() => handleReplyInput(item.id)}
                          className={
                            "text-[#474761] text-[16px] absolute right-5 top-1"
                          }
                        >
                          Reply
                        </NavLink>
                      )}
                    </div>
                    <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                      {data?.commentText}
                    </div>
                    {isSelected(data.id) && (
                      <div className={"reply-box mt-[20px] relative"}>
                        <Formik
                          initialValues={initialRepliesValues}
                          validationSchema={validationSchemaReplies}
                          enableReinitialize
                          onSubmit={async (values) => {
                            const newValues = {
                              commentText: values?.commentText,
                              ticketCommentId: item.id,
                              ticketCommentParentReplyId: data.id,
                            };
                            (async () => {
                              await dispatch(addTicketReplies(newValues));
                              await dispatch(getTicketById(id));
                              setSelected([]);
                            })();
                          }}
                        >
                          {({ errors, touched, values }) => {
                            return (
                              <Form>
                                <Field
                                  className="modal__form-el-field"
                                  key="commentText"
                                  type="text"
                                  name="commentText"
                                  placeholder="Write Something"
                                />
                                {touched["commentText"] &&
                                  errors["commentText"] && (
                                    <div className="error mt-[8px]">
                                      {errors["commentText"]}
                                    </div>
                                  )}
                                <Button
                                  htmlType="submit"
                                  loading={repliesLoading}
                                  className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent"
                                >
                                  <ReplyIcon />
                                </Button>
                              </Form>
                            );
                          }}
                        </Formik>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
