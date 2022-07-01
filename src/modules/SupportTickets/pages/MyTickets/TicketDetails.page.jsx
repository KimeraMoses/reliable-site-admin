import { Details, RelatedList } from './sections';

export const MyTickets = () => {
  return (
    <div className="p-[40px] flex flex-col gap-[40px]">
      <RelatedList />
      <Details />
    </div>
  );
};
