import { Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { addTicketComments } from "store";
import { editTicket } from "store";

export const AssignTicket = ({ show, setShow, id }) => {
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const { usersLoading } = useSelector((state) => state?.departments);
  const { ticket, detailsLoading, loading } = useSelector(
    (state) => state?.tickets
  );
  let deptData = [];
  users?.forEach((user) => {
    const isOnline = onlineUsers?.find((admin) => admin?.userId === user?.id)
      ? true
      : false;
    deptData.push({
      value: user?.id,
      label: user?.fullName ? user?.fullName : "N/A",
      isActive: isOnline ? true : false,
    });
  });

  const fields = [
    {
      type: "select",
      name: "assignedTo",
      placeholder: "Select Admin",
      options: deptData?.sort((a, b) =>
        a?.isActive === b?.isActive ? 0 : a?.isActive ? -1 : 1
      ),
      title: "Admin",
    },
    {
      type: "textarea",
      name: "comment",
      title: "Comment",
      placeholder: "Enter Comment Here...",
    },
  ];

  const initialValues = {
    assignedTo: ticket?.assignedTo,
    comment: "",
  };

  const dispatch = useDispatch();

  return (
    <Modal
      heading="Assign Ticket"
      submitText="Assign Ticket"
      show={show}
      setShow={setShow}
      fields={fields}
      initialValues={initialValues}
      loading={detailsLoading || loading || usersLoading}
      handleSubmit={async (values) => {
        const finalTicketValues = {
          ...ticket,
          assignedTo: values?.assignedTo,
        };
        // Edit Ticket Assigned To
        await dispatch(editTicket({ data: finalTicketValues }));

        if (values?.comment) {
          await dispatch(
            addTicketComments({
              ticketId: ticket?.id,
              commentText: values?.comment,
              isSticky: false,
              isDraft: false,
              ticketCommentAction: 1,
              ticketCommentType: 1,
            })
          );
        }
        setShow(false);
      }}
    />
  );
};
