import { RelatedList } from "components/TicketDetails/sections";
import { useSelector } from "react-redux";

export const Queue = () => {
  const { allTickets } = useSelector((state) => state?.tickets);

  const data = allTickets?.filter((ticket) => ticket?.assignedTo === "");
  return (
    <div className="p-[40px] flex flex-col gap-[40px]">
      <RelatedList queueList={data} />
    </div>
  );
};
