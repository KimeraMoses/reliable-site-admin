import { Next } from 'icons';

const PS = ({
  title = 'Ticket Title',
  type = 'Product',
  desc = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
  status = 'done',
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-[16px] items-center">
          <div className="w-[100px] h-[70px] text-white flex items-center justify-center">
            <img
              src="data:image/png;base64,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"
              alt="car"
              className="h-full w-full object-cover rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[12px] items-center">
              <div className="text-white text-base text-[16px]">{title}</div>
              <div
                className={`rounded-[4px] py-[4px] px-[8px] ${
                  type === 'Product'
                    ? 'bg-[#2F264F] text-[#8950FC]'
                    : 'bg-[#392F28] text-[#FFA800]'
                }`}
              >
                {type}
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

export const ProductsServices = () => {
  return (
    <div className="mt-4 p-[32px] bg-[#1E1E2D] rounded-lg">
      <h6 className="text-white mb-[32px] text-[16px]">Products & Services</h6>

      <div className="flex flex-col gap-[16px] justify-center">
        <PS />
        <PS type="Service" />
        <PS />
        <PS type="Service" />
      </div>
    </div>
  );
};
