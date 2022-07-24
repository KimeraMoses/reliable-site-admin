import { useDispatch, useSelector } from 'react-redux';
import {
  FieldTimeOutlined,
  PushpinOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Table, TicketMenu } from 'components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkModule } from 'lib/checkModule';
import './styles.scss';
import {
  getTicketsByAdminID,
  getTickets,
  getTicketsByDepartmentId,
} from 'store';
import { getUsers } from 'store';
import { getClients } from 'store';
import { Button, message, Spin } from 'antd';
import moment from 'moment';
import {
  AssignTicket,
  FollowUp,
  Priority,
  Status,
} from 'components/TicketModals';
import { getTicketById } from 'store';
import { editTicket } from 'store';

export const RelatedList = () => {
  const location = useLocation();
  const { allTickets, departmentTickets, loading } = useSelector(
    (state) => state?.tickets
  );
  const userTickets = useSelector((state) => state?.tickets?.tickets);
  const { clients, users } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const usersLoading = useSelector((state) => state?.users?.loading);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );

  const tickets = location?.pathname?.includes('show-all')
    ? allTickets
    : location?.pathname.includes('by-department')
    ? departmentTickets
    : userTickets;

  const currentRoute = ({ deptId = '', id = '' }) =>
    location?.pathname?.includes('show-all')
      ? `/admin/dashboard/support/tickets/show-all/list/details/${id}?tid=${id}`
      : location?.pathname.includes('by-department')
      ? `/admin/dashboard/support/tickets/by-departments/${deptId}/details/${id}?tid=${id}`
      : `/admin/dashboard/support/tickets/list?tid=${id}`;

  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: 'Users',
    modules: userModules,
  });

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (tickets.length) {
      const dataToSet = tickets?.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      const trueFirst = dataToSet.sort(
        (a, b) => Number(b.pinTicket) - Number(a.pinTicket)
      );
      setData(trueFirst);
    }
  }, [tickets]);

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Follow Up | High Priority | Pinned',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[12px]">
            <div
              className={
                record?.followUpOn
                  ? 'action-icon action-icon-active'
                  : 'action-icon'
              }
            >
              <FieldTimeOutlined />
            </div>
            <div
              className={
                record?.ticketPriority === 2
                  ? 'action-icon action-icon-active'
                  : 'action-icon'
              }
            >
              <RiseOutlined />
            </div>
            <div
              className={
                record?.pinTicket
                  ? 'action-icon action-icon-active'
                  : 'action-icon'
              }
            >
              <PushpinOutlined />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Subject',
      dataIndex: 'ticketTitle',
      key: 'ticketTitle',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text) => {
        const client = clients?.find((client) => client?.id === text);
        const admin = users?.find((user) => user?.id === text);
        return client?.fullName
          ? client.fullName
          : admin?.fullName
          ? admin.fullName
          : 'N/A';
      },
    },
    {
      title: 'Department',
      dataIndex: 'departmentId',
      key: 'departmentId',
      render: (text) => {
        const department = departments?.find((dept) => dept?.id === text);
        return department?.name ? department?.name : 'N/A';
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (text) => {
        const admin = users?.find((user) => user?.id === text);
        return admin?.fullName ? admin.fullName : 'N/A';
      },
    },
    {
      title: 'Follow-Up',
      dataIndex: 'followUpOn',
      key: 'followUpOn',
      render: (text) => <>{text ? moment(text).format('MM/DD/YYYY') : 'N/A'}</>,
    },
    {
      title: 'No. of Messages',
      dataIndex: 'ticketComments',
      key: 'ticketComments',
      render: (text) => text?.length || '0',
    },
    {
      title: 'Idle Time',
      dataIndex: 'idleTime',
      key: 'idleTime',
      render: (text) => <>{text ? text : 'N/A'}</>,
    },
  ];

  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      if (location?.pathname.includes('show-all')) {
        await dispatch(getTickets());
      } else if (location?.pathname?.includes('by-department')) {
        getTicketsByDepartmentId({ id: location?.state?.departmentId });
      } else {
        await dispatch(getTicketsByAdminID({ id: user?.id }));
      }
      await dispatch(getUsers());
      await dispatch(getClients());
    })();
  }, [dispatch]);

  // Selected Rows
  const [selectedRows, setSelectedRows] = useState(false);

  // Methods to Select Rows
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const [showPriority, setShowPriority] = useState(false);
  const [followup, setFollowUp] = useState(false);
  const [status, setStatus] = useState(false);
  const [assign, setAssign] = useState(false);
  return (
    <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px]`}>
      <Priority show={showPriority} setShow={setShowPriority} />
      <FollowUp show={followup} setShow={setFollowUp} />
      <AssignTicket show={assign} setShow={setAssign} />
      <Status show={status} setShow={setStatus} />
      {loading || departmentsLoading || usersLoading ? (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <Spin spinning size="large" />
        </div>
      ) : (
        <div>
          <Table
            columns={columns}
            data={data}
            fieldToFilter="id"
            permissions={permissions}
            pagination={{ pageSize: 4 }}
            additionalBtns={
              selectedRows?.length
                ? [
                    { text: 'Pin', onClick: () => {} },
                    { text: 'Assign', onClick: () => {} },
                    { text: 'Delete', onClick: () => {} },
                  ]
                : []
            }
            rowSelection={rowSelection}
            editAction={(record) => {
              return (
                <>
                  {/* <Button>Reply</Button> */}
                  <Button
                    onClick={async () => {
                      setAssign(true);
                      await dispatch(getTicketById(record?.id));
                    }}
                  >
                    Transfer
                  </Button>
                  <Button
                    onClick={async () => {
                      setShowPriority(true);
                      await dispatch(getTicketById(record?.id));
                    }}
                  >
                    Priority
                  </Button>
                  <Button
                    onClick={async () => {
                      setFollowUp(true);
                      await dispatch(getTicketById(record?.id));
                    }}
                  >
                    Follow-Up
                  </Button>
                  <Button
                    onClick={async () => {
                      await dispatch(
                        editTicket({ data: { ...record, pinTicket: true } })
                      );
                      if (location?.pathname.includes('show-all')) {
                        await dispatch(getTickets());
                      } else if (
                        location?.pathname?.includes('by-department')
                      ) {
                        getTicketsByDepartmentId({
                          id: location?.state?.departmentId,
                        });
                      } else {
                        await dispatch(getTicketsByAdminID({ id: user?.id }));
                      }
                      message.success('Ticket Pinned');
                    }}
                  >
                    Pin
                  </Button>
                </>
              );
            }}
            customFilterSort={<></>}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  navigate(
                    `${currentRoute({
                      deptId: record?.departmentId,
                      id: record?.id,
                    })}`
                  );
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {
                  event.preventDefault();
                  if (!visible) {
                    document.addEventListener(
                      `click`,
                      function onClickOutside() {
                        setVisible(false);
                        document.removeEventListener(`click`, onClickOutside);
                      }
                    );
                  }
                  setVisible(true);
                  setPopup({
                    record,
                    x: event.clientX,
                    y: event.clientY,
                  });
                }, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            // headingTitle={}
            // t={t}
          />
          {<TicketMenu {...popup} visible={visible} />}
        </div>
      )}
    </div>
  );
};
