import { Next, Ticket as TicketIcon } from 'icons';
import { useTranslation } from 'react-i18next';

const Ticket = ({
  title = 'Ticket Title',
  tag = 'TAG TITLE',
  desc = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
  status = 'done',
}) => {
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
              <div className="rounded-[4px] bg-[#323248] py-[4px] px-[8px] text-white">
                {tag}
              </div>
            </div>
            <div className="text-[#474761]">{desc}</div>
          </div>
        </div>
        <div className="bg-[#323248] p-[8px] rounded-lg cursor-pointer">
          <Next />
        </div>
      </div>
      <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-[16px]" />
    </div>
  );
};

const tickets = [];

export const AssignedTickets = () => {
  const { t } = useTranslation('Users/ns');

  return (
    <div className="mt-4 p-[32px] bg-[#1E1E2D] rounded-lg">
      <h6 className="text-white mb-[32px] text-[16px]">
        {t('supportTickets')}
      </h6>

      {tickets?.length ? (
        <div className="flex flex-col gap-[16px] justify-center">
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
        </div>
      ) : (
        <h4 className="text-white mt-[16px] text-center w-full">
          No Tickets Created Yet!
        </h4>
      )}
    </div>
  );
};
