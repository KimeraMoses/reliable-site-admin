import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'components';
import { Ticket as TicketIcon } from 'icons';
import { checkModule } from 'lib/checkModule';
import { getTicketsByDepartmentId } from 'store';
import './styles.scss';

export const RelatedList = () => {
  const { tickets, loading } = useSelector((state) => state?.tickets);
  const { userModules } = useSelector((state) => state?.modules);

  const location = useLocation();

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
                `/admin/dashboard/support/tickets/by-departments/details/${record?.id}`,
                {
                  state: {
                    departmentId: location?.state?.departmentId,
                    departmentName: location?.state?.departmentName,
                  },
                }
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

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(
        getTicketsByDepartmentId({ id: location?.state?.departmentId })
      );
    })();
  }, [dispatch]);
  return (
    <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] custom-tickets-table`}>
      <h4 className="text-white text-[18px] font-medium mb-[32px]">
        {location?.state?.departmentName}
      </h4>
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
