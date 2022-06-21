import { Spin } from 'antd';
import { Next, Ticket as TicketIcon } from 'icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketsByAdminID } from 'store';

const Ticket = ({ title, description, id }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[16px] items-center">
          <div className="w-[70px] h-[70px] bg-[#1C3238] text-white flex items-center justify-center rounded-lg p-[8px]">
            <TicketIcon />
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[12px] items-center">
              <div className="text-white text-base text-[16px]">{title}</div>
              {/* <div className="rounded-[4px] bg-[#323248] py-[4px] px-[8px] text-white">
                {tag}
              </div> */}
            </div>
            <div className="text-[#474761]">{description}</div>
          </div>
        </div>
        <div
          className="bg-[#323248] p-[8px] rounded-lg cursor-pointer"
          onClick={() => {
            navigate(`/admin/dashboard/support/tickets/details/${id}`);
          }}
        >
          <Next />
        </div>
      </div>
      <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-[16px]" />
    </div>
  );
};

// const tickets = [];

export const AssignedTickets = () => {
  const { t } = useTranslation('Users/ns');

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicketsByAdminID({ id }));
  }, []);

  const { tickets, loading } = useSelector((state) => state?.tickets);

  return (
    <div className="mt-4 p-[32px] bg-[#1E1E2D] rounded-lg">
      <Spin spinning={loading}>
        <h6 className="text-white mb-[32px] text-[16px]">
          {t('supportTickets')}
        </h6>

        {tickets?.length ? (
          <div className="flex flex-col gap-[16px] justify-center">
            {tickets?.map((ticket) => {
              return (
                <Ticket
                  title={ticket?.ticketTitle}
                  description={ticket?.description}
                  id={ticket?.id}
                />
              );
            })}
          </div>
        ) : (
          <h4 className="text-white mt-[16px] text-center w-full">
            No Tickets Assigned Yet!
          </h4>
        )}
      </Spin>
    </div>
  );
};
