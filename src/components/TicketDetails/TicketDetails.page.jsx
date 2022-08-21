import { Details, RelatedList } from "./sections";

export const TicketDetailsComponent = () => {
  return (
    <div className="p-[40px] flex flex-col gap-[30px]">
      <RelatedList />
      <Details />
    </div>
  );
};
