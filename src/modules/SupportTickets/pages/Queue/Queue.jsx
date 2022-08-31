import { Details } from "components/TicketDetails/sections";
import React from "react";
import { QueueList } from "./TicketDetails.page";
import { WaitingList } from "./WaitingList";

const Queue = ({ type }) => {
  return (
    <div className="p-[40px] flex flex-col gap-[30px]">
      {type === "waiting" ? <WaitingList /> : <QueueList />}
      <Details />
    </div>
  );
};

export default Queue;
