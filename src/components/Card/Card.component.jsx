export const Card = ({ heading, children }) => {
  return (
    <div className="bg-[#1E1E2D] rounded-[8px]">
      {/* Card Heading */}
      <div className="p-[32px] text-[16px] text-white">{heading}</div>
      {/* Card Divider */}
      <hr className="border-t-[#323248] border-dashed" />
      {/* Card Body */}
      <div className="p-[32px]">{children}</div>
    </div>
  );
};
