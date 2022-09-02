import { Ticket as TicketIcon } from "icons";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getTicketById } from "store";
import { getTimeDiff } from "lib";
import {
  Communication,
  TicketHistory,
  Navigation,
  Comments,
  Drafts,
} from "./sections";
import { useLocation } from "react-router-dom";
import { getUsersByDepartmentID } from "store";

export function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Details = () => {
  const dispatch = useDispatch();
  const { detailsLoading, ticket, ticketHistory } = useSelector(
    (state) => state?.tickets
  );
  const { usersLoading } = useSelector((state) => state?.departments);
  const { users } = useSelector((state) => state?.users);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let repliesId = params.get("id");
  const query = useQuery();
  const id = query.get("tid");

  const createdByAdmin = users?.find((user) => user?.id === ticket?.createdBy);
  // const createdByClient = clients?.find(
  //   (user) => user?.id === ticket?.createdBy
  // );

  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(getTicketById(id));
        goToViolation(repliesId);
      }
    })();
  }, [id, repliesId]);

  useEffect(() => {
    (async () => {
      if (ticket?.departmentId) {
        await dispatch(getUsersByDepartmentID({ id: ticket?.departmentId }));
      }
    })();
  }, [ticket]);

  const goToViolation = (id) => {
    const violation = document.getElementById(id);
    if (violation) {
      violation.scrollIntoView();
    }
  };

  const communication = ticket?.ticketComments?.filter(
    (comment) => comment?.ticketCommentType === 0 && !comment?.isDraft
  );
  const comments = ticket?.ticketComments?.filter(
    (comment) => comment?.ticketCommentType === 1 && !comment?.isDraft
  );
  const drafts = ticket?.ticketComments?.filter(
    (comment) => comment?.isDraft === true
  );

  const linksArr = [
    {
      label: "Communication",
      count: communication?.length > 0 ? communication?.length : 0,
    },
    {
      label: "Drafts",
      count: drafts?.length > 0 ? drafts?.length : 0,
    },
    {
      label: "Comments",
      count: comments?.length > 0 ? comments?.length : 0,
    },
    {
      label: "History",
      count: ticketHistory?.length > 0 ? ticketHistory?.length : 0,
    },
  ];
  // Handle Navigation
  const [active, setActive] = useState(linksArr[0]?.label);
  const links = linksArr?.map((link) => {
    return {
      label: link?.label,
      count: link?.count,
      showCount: true,
      onClick: () => setActive(link?.label),
    };
  });

  // console.log("active ticket", ticket);

  return (
    <>
      {id ? (
        <div className="ticket-wrap bg-[#1E1E2D] text-[#ffffff] p-[40px] rounded-[8px]">
          {ticket === null && !detailsLoading && !usersLoading ? (
            <></>
          ) : detailsLoading || usersLoading ? (
            <div className="text-center">
              <Spin
                size="large"
                style={{ gridColumn: "1/3", alignSelf: "center" }}
              />
            </div>
          ) : (
            <div className="">
              <div className="flex">
                <div className="w-[50px] tick">
                  <TicketIcon />
                </div>
                <div className="ml-[20px]">
                  <h3 className={"text-[24px] text-[#fff]"}>
                    {ticket?.ticketTitle}
                  </h3>
                  <div
                    className={
                      "mt-[8px] text-[#474761] flex items-center gap-[12px]"
                    }
                  >
                    <p className="text-[14px]">
                      By{" "}
                      {!ticket?.incomingFromClient && createdByAdmin?.fullName
                        ? createdByAdmin?.fullName
                        : ticket?.clientFullName
                        ? ticket?.clientFullName
                        : "N/A"}
                    </p>{" "}
                    <p
                      className={`${
                        !ticket?.incomingFromClient && createdByAdmin?.fullName
                          ? "bg-[#1C3238] text-[#0BB783]"
                          : "bg-[#2F264F] text-[#8950FC]"
                      } rounded-[4px] text-[14px] px-[8px] py-[4px]`}
                    >
                      {!ticket?.incomingFromClient && createdByAdmin?.fullName
                        ? "Admin"
                        : ticket?.clientFullName
                        ? "Client"
                        : "N/A"}
                    </p>
                  </div>
                  <p className="text-[14px] mt-[12px] text-[#474761]">
                    {`Created ${getTimeDiff(ticket?.createdOn)} ago`}
                  </p>
                </div>
              </div>
              {/* navigation */}
              <Navigation active={active} links={links} />
              {active === "Communication" ? <Communication /> : <></>}
              {active === "Drafts" ? <Drafts setActive={setActive} /> : <></>}
              {active === "Comments" ? <Comments /> : <></>}
              {active === "History" ? <TicketHistory /> : <></>}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
