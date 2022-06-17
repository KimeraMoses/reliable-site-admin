import { Switch } from 'antd';

const DepartmentSelector = ({ name, value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-[rgb(146,_146,_143)] text-[12px]">{name}</div>
      <Switch />
    </div>
  );
};

export const Departments = ({ departments }) => {
  return (
    <div
      className={`w-[278px] bg-[#1E1E2D] shadow-lg ${
        departments ? '' : 'hidden'
      } rounded-lg text-gray-300`}
      style={{
        position: 'absolute',
        top: '214px',
        left: '-200px',
        zIndex: 4,
      }}
    >
      {/* Heading */}
      <div className="p-[20px] border-b-[1px] border-b-[#323248] cursor-auto text-white text-[14px]">
        Departments
      </div>
      <div className="p-[20px] flex flex-col gap-[20px]">
        <DepartmentSelector name="Department 1" value="2876ajsy1=21ejd" />
        <DepartmentSelector name="Department 2" value="2876ajsy1=21ejd" />
        <DepartmentSelector name="Department 3" value="2876ajsy1=21ejd" />
        <DepartmentSelector name="Department 4" value="2876ajsy1=21ejd" />
        <DepartmentSelector name="Department 5" value="2876ajsy1=21ejd" />
        <DepartmentSelector name="Department 6" value="2876ajsy1=21ejd" />
      </div>
    </div>
  );
};
