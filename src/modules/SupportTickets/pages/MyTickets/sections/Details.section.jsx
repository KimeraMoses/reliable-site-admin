import { Ticket as TicketIcon } from 'icons';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getTicketById, getUsers } from 'store';
import moment from 'moment';
import { getDifference } from 'lib';
import { Navigation } from '.';
import { Comments } from './Comments.section';
import { TicketHistory } from './TicketHistory.section';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Details = () => {
  const dispatch = useDispatch();
  const { detailsLoading, ticket } = useSelector((state) => state?.tickets);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let repliesId = params.get('id');
  const query = useQuery();
  const id = query.get('tid');

  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(getTicketById(id));
        // await dispatch(getUsers());
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

  const linksArr = ['Comments', 'History'];
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
              <p className={'mt-[8px] text-[#474761]'}>
                <span className="mr-[20px]">By {ticket?.createdByName}</span>{' '}
                <span>{`Created ${getDifference(
                  new Date(ticket.createdOn)
                )} - ${moment(ticket?.createdOn).format(
                  'MMMM Do, YYYY h:m A'
                )}`}</span>
              </p>
            </div>
          </div>
          {/* navigation */}
          <Navigation active={active} links={links} />
          {active === 'Comments' ? <Comments /> : <></>}
          {active === 'History' ? <TicketHistory /> : <></>}
        </div>
      )}
    </div>
  );
};
