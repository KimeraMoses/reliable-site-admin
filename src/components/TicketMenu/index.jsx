import { message } from 'antd';
import { Priority } from 'components';
import { AssignTicket, FollowUp, Status } from 'components/TicketModals';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTicketsByDepartmentId } from 'store';
import { getTicketsByAdminID } from 'store';
import { getTickets } from 'store';
import { editTicket } from 'store';
// import { Icon } from 'antd';
import './index.scss';

export const TicketMenu = ({ visible, options, record, x, y }) => {
  const [showPriority, setShowPriority] = useState(false);
  const [assign, setAssign] = useState(false);
  const [followup, setFollowUp] = useState(false);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useState((state) => state?.auth);

  const defaultOptions = [
    {
      label: 'Transfer',
      onClick: (record) => {
        setAssign(true);
      },
    },
    {
      label: 'Status',
      onClick: (record) => {
        setStatus(true);
      },
    },
    {
      label: 'Follow-Up',
      onClick: (record) => {
        setFollowUp(true);
      },
    },
    {
      label: 'Priority',
      onClick: (record) => {
        setShowPriority(true);
      },
    },
    {
      label: 'Pin',
      onClick: async (record) => {
        await dispatch(editTicket({ data: { ...record, pinTicket: true } }));
        if (location?.pathname.includes('show-all')) {
          await dispatch(getTickets());
        } else if (location?.pathname?.includes('by-department')) {
          getTicketsByDepartmentId({ id: location?.state?.departmentId });
        } else {
          await dispatch(getTicketsByAdminID({ id: user?.id }));
        }
        message.success('Ticket Pinned');
      },
    },
    {
      label: 'Delete',
      onClick: (record) => {
        // message.success('Ticket Deleted');
      },
    },
  ];

  const finalOptions = options?.length ? options : defaultOptions;
  return (
    <>
      <Priority show={showPriority} setShow={setShowPriority} id={record?.id} />
      <FollowUp show={followup} setShow={setFollowUp} id={record?.id} />
      <AssignTicket show={assign} setShow={setAssign} id={record?.id} />
      <Status show={status} setShow={setStatus} id={record?.id} />
      <ul
        className={`popup ${visible ? '' : 'hidden'}`}
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        {finalOptions?.map((option) => {
          return (
            <li onClick={() => option?.onClick(record)}>{option?.label}</li>
          );
        })}
      </ul>
    </>
  );
};
