import { Products, SMTP } from '.';

export const Left = () => {
  return (
    <div>
      {/* Products + Other Fields Configuration Side */}
      <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
        <Products />
      </div>
      <div className="bg-[#1E1E2D] pb-[32px] pt-[32px] rounded-[8px] mt-[20px]">
        <SMTP />
      </div>
    </div>
  );
};
