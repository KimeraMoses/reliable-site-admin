import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'components';
import { Ticket as TicketIcon } from 'icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkModule } from 'lib/checkModule';
import './styles.scss';
import {
  getTicketsByAdminID,
  getTickets,
  getTicketsByDepartmentId,
} from 'store';

export const RelatedList = () => {
  const location = useLocation();
  const { allTickets, departmentTickets, loading } = useSelector(
    (state) => state?.tickets
  );
  const userTickets = useSelector((state) => state?.tickets?.tickets);

  const tickets = location?.pathname?.includes('show-all')
    ? allTickets
    : location?.pathname.includes('by-department')
    ? departmentTickets
    : userTickets;
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
      const dataToSet = tickets
        ?.filter(function (el) {
          return el.ticketStatus === 0;
        })
        .map((b) => {
          return {
            ...b,
            key: b?.id,
          };
        });
      setData(dataToSet);
    }
  }, [tickets]);

  const navigate = useNavigate();

  const columns = [
    {
      title: '',
      dataIndex: 'description',
      key: 'description',
      render: (description, record) => {
        return (
          <div
            className="flex cursor-pointer"
            onClick={() => {
              navigate(
                `/admin/dashboard/support/tickets/details/${record?.id}`
              );
            }}
          >
            <TicketIcon />
            <div className="ml-[8px]">
              <h3 className={`text-[#FFFFFF]`}>
                {record?.ticketTitle}{' '}
                {`${
                  record?.tagTitle ? (
                    <span
                      className={`uppercase ml-[12px] text-[10px] bg-[#323248] pt-[4px] pb-[4px] pl-[8px] pr-[8px]`}
                    >
                      ${record?.tagTitle}
                    </span>
                  ) : (
                    ''
                  )
                }`}
              </h3>
              <p className={'text-[#474761] text-[14px] mt-[12px]'}>
                {description}
              </p>
            </div>
          </div>
        );
      },
    },
  ];

  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (location?.pathname.includes('show-all')) {
        await dispatch(getTickets());
      } else if (location?.pathname?.includes('by-department')) {
        getTicketsByDepartmentId({ id: location?.state?.departmentId });
      } else {
        await dispatch(getTicketsByAdminID({ id: user?.id }));
      }
    })();
  }, [dispatch]);
  return (
    <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] custom-tickets-table`}>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        fieldToFilter="ticketRelatedTo"
        permissions={permissions}
        hideActions={true}
        customFilterSort={<></>}
        // headingTitle={}
        // t={t}
      />
    </div>
  );
};
