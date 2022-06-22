import { Details, RelatedList } from './sections';

export const TicketDetails = () => {
  return (
    <div className="p-[40px] grid grid-cols-[1fr_3fr] gap-[40px]">
      <RelatedList />
      <Details />
    </div>
  );
};
