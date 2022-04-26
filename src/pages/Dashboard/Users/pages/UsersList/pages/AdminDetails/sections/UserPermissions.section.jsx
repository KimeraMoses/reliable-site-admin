import { Checkbox } from 'antd';

const modules = [
  { name: 'Module 1', id: '1' },
  { name: 'Module 2', id: '2' },
  { name: 'Module 3', id: '3' },
  { name: 'Module 4', id: '4' },
];

export const UserPermissions = () => {
  return (
    <div className="mt-[20px] p-[32px] bg-[#1E1E2D] rounded-[8px]">
      <h6 className="text-white text-[16px]">User Permissions</h6>
      <hr className="border-dashed border-t-[1px] border-[#323248] mt-[32px] mb-[32px]" />
      {modules?.map((module, index) => (
        <div key={module?.id}>
          <div className="flex items-center justify-between">
            <p className="text-white text-[14px]">{module?.name}</p>
            <div className="flex items-center gap-[20px]">
              <Checkbox>
                <p className="mb-0 text-[#92928F]">All</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">Create</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">Read</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">Update</p>
              </Checkbox>
              <Checkbox>
                <p className="mb-0 text-[#92928F]">Delete</p>
              </Checkbox>
            </div>
          </div>
          {modules?.length > index + 1 ? (
            <hr className="border-dashed border-t-[1px] border-[#323248] mt-[32px] mb-[32px]" />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};
