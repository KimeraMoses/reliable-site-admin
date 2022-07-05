import { Ticket as TicketIcon } from 'icons';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getTicketById } from 'store';
import moment from 'moment';
import { getDifference } from 'lib';
import {
  Communication,
  TicketHistory,
  Navigation,
  Comments,
  Drafts,
} from './sections';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Details = () => {
  const dispatch = useDispatch();
  const { detailsLoading, ticket } = useSelector((state) => state?.tickets);
  const { users, clients } = useSelector((state) => state?.users);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let repliesId = params.get('id');
  const query = useQuery();
  const id = query.get('tid');

  const createdByAdmin = users?.find((user) => user?.id === ticket?.createdBy);
  const createdByClient = clients?.find(
    (user) => user?.id === ticket?.createdBy
  );

  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(getTicketById(id));
        goToViolation(repliesId);
      }
    })();
  }, [id]);

  const goToViolation = (id) => {
    const violation = document.getElementById(id);
    if (violation) {
      violation.scrollIntoView();
    }
  };

  const linksArr = ['Communication', 'Drafts', 'Comments', 'History'];
  // Handle Navigation
  const [active, setActive] = useState(linksArr[0]);
  const links = linksArr?.map((link) => {
    return {
      label: link,
      count: 2,
      onClick: () => setActive(link),
    };
  });
  return (
    <div className="ticket-wrap bg-[#1E1E2D] text-[#ffffff] p-[40px] rounded-[8px]">
      {ticket === null && !detailsLoading ? (
        <></>
      ) : detailsLoading ? (
        <div className="text-center">
          <Spin
            size="large"
            style={{ gridColumn: '1/3', alignSelf: 'center' }}
          />
        </div>
      ) : (
        <div className="">
          <div className="flex">
            <div className="w-[50px] tick">
              <TicketIcon />
            </div>
            <div className="ml-[20px]">
              <h3 className={'text-[24px] text-[#fff]'}>
                {ticket?.ticketTitle}
              </h3>
              <div
                className={
                  'mt-[8px] text-[#474761] flex items-center gap-[12px]'
                }
              >
                <p className="text-[14px]">
                  By{' '}
                  {createdByAdmin?.fullName
                    ? createdByAdmin?.fullName
                    : createdByClient?.fullName
                    ? createdByClient?.fullName
                    : 'N/A'}
                </p>{' '}
                <p
                  className={`${
                    createdByAdmin?.fullName
                      ? 'bg-[#1C3238] text-[#0BB783]'
                      : 'bg-[#2F264F] text-[#8950FC]'
                  } rounded-[4px] text-[14px] px-[8px] py-[4px]`}
                >
                  {createdByAdmin?.fullName
                    ? 'Admin'
                    : createdByClient?.fullName
                    ? 'Client'
                    : 'N/A'}
                </p>
              </div>
              <p className="text-[14px] mt-[12px] text-[#474761]">{`Created ${getDifference(
                new Date(ticket.createdOn)
              )} - ${moment(ticket?.createdOn).format(
                'MMMM Do, YYYY h:m A'
              )}`}</p>
            </div>
          </div>
          {/* navigation */}
          <Navigation active={active} links={links} />
          {active === 'Communication' ? <Communication /> : <></>}
          {active === 'Drafts' ? <Drafts setActive={setActive} /> : <></>}
          {active === 'Comments' ? <Comments /> : <></>}
          {active === 'History' ? <TicketHistory /> : <></>}
        </div>
      )}
    </div>
  );
};
