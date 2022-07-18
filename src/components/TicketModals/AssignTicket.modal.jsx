import { Spin } from 'antd';
import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addTicketComments } from 'store';
import { editTicket } from 'store';

export const AssignTicket = ({ show, setShow, id }) => {
  const { users } = useSelector((state) => state?.users);
  const { ticket, detailsLoading } = useSelector((state) => state?.tickets);

  const fields = [
    {
      type: 'select',
      name: 'assignedTo',
      placeholder: 'Select Admin',
      options: users?.map((user) => ({
        label: user?.fullName ? user?.fullName : user?.email,
        value: user?.id,
      })),
      title: 'Admin',
    },
    {
      type: 'textarea',
      name: 'comment',
      title: 'Comment',
      placeholder: 'Enter Comment Here...',
    },
  ];

  const initialValues = {
    assignedTo: ticket?.assignedTo,
    comment: '',
  };

  const dispatch = useDispatch();

  return (
    <Spin spinning={detailsLoading}>
      <Modal
        heading="Assign Ticket"
        submitText="Assign Ticket"
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues}
        loading={detailsLoading}
        // validationSchema={validationSchema}
        handleSubmit={async (values) => {
          const finalTicketValues = {
            ...ticket,
            assignedTo: values?.assignedTo,
          };

          // Edit Ticket Assigned To
          await dispatch(editTicket({ data: finalTicketValues }));

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
          // editTicket
          // addTicketComments

          // setShow(false);
          console.log(finalTicketValues);
        }}
      />
    </Spin>
  );
};
