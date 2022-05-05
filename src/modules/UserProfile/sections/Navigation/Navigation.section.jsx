import { Button } from 'components';
import UserName from 'layout/components/navbar/UserProfileCard/UserName';

const user = {
  imageUrl: 'https://i.pravatar.cc/900',
  fullName: 'John Doe',
  email: 'Paul.Elliott@Fakemail.com',
  status: 'Active',
};
const isLoggedIn = true;

export const Navigation = ({ items, active }) => {
  return (
    <div className="bg-[#1E1E2D] rounded-[8px]">
      <div className="p-[32px]">
        <div className="flex justify-between">
          {/* PIC + NAME + EMAIL + STATUS */}
          <div className="flex gap-[32px]">
            <div
              className={`w-[130px] h-[130px] flex items-center justify-center text-[#fff] text-[40px] ${
                !user.imageUrl
                  ? 'border-[#3699FF] border-[2px] rounded-[5px]'
                  : ''
              }`}
            >
              {user && user.imageUrl && user.imageUrl.length > 0 ? (
                <img
                  src={user && user.imageUrl}
                  alt={user && user.userName}
                  className="h-full w-full rounded-[5px] object-cover"
                />
              ) : (
                <UserName isLoggedIn={isLoggedIn} user={user} />
              )}
            </div>
            <div>
              <div className="pt-[16px] text-[#fff] text-[24px]">
                {user?.fullName}
              </div>
              <div className="text-[#474761] text-[14px] mb-[20px]">
                {user.email}
              </div>
              <div className="bg-[#1C3238] text-[#0BB783] px-[8px] py-[4px] w-[fit-content] rounded-[4px]">
                {user.status}
              </div>
            </div>
          </div>
          {/* Buttons + Profile Completion */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-[8px] min-w-[250px]">
              <Button type="secondary">Follow</Button>
              <Button>Hire Me</Button>
              <Button type="secondary">...</Button>
            </div>
            {/* Progress Profile Completion */}
            <div>
              <div className="flex justify-between items-center">
                <div className="text-[#474761] text-[14px]">
                  Profile Completion
                </div>
                <div className="text-[#fff] text-[14px]">50%</div>
              </div>
              <div className="mt-[8px] w-full relative bg-[#323248] h-[4px] rounded-[4px]">
                <div className="absolute w-[50%] bg-[#0BB783] h-[4px] rounded-[4px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Divider  */}
      <hr
        className="w-full border-t-[2px] border-t-[#474761] border-dashed"
        style={{ height: 0 }}
      />
      {/* Navigation */}
      <div className="p-[32px] flex items-center gap-[64px]">
        {items.map(({ name, onClick }) => {
          return (
            <div
              key={name}
              className={`text-[14px] uppercase hover:text-[#3699FF] cursor-pointer transition-all ${
                active === name ? 'text-[#3699FF]' : 'text-[#6D6D80]'
              }`}
              onClick={onClick}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};