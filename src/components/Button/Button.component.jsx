import { Button as $Button } from 'antd';

export const Button = ({ type, children, htmlType, onClick }) => {
  return (
    <$Button
      htmlType={htmlType}
      onClick={onClick}
      className={`rounded-[8px] text-white h-[44px] border-none ${
        type === 'secondary'
          ? 'bg-[#323248] hover:bg-[#323248] focus:bg-[#323248]'
          : 'bg-[#3699FF] hover:bg-[#3699FF] focus:bg-[#3699FF]'
      }`}
    >
      {children}
    </$Button>
  );
};
