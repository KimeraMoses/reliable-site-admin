import { Button as $Button } from 'antd';
import './Button.styles.scss';

export const Button = ({
  type,
  children,
  htmlType,
  onClick,
  className,
  disabled,
  loading,
}) => {
  return (
    <$Button
      disabled={disabled}
      htmlType={htmlType}
      onClick={onClick}
      loading={loading}
      className={`rounded-[8px] text-white h-[44px] border-none px-[24px] py-[12px] ${
        type === 'secondary'
          ? 'bg-[#323248] hover:bg-[#323248] focus:bg-[#323248]'
          : 'bg-[#3699FF] hover:bg-[#3699FF] focus:bg-[#3699FF]'
      } ${className} ${disabled && 'custom-button-disabled'}`}
    >
      {children}
    </$Button>
  );
};
