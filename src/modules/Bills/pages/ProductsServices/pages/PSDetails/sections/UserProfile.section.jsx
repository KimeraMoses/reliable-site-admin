import { getName } from 'lib';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const UserProfileCard = () => {
  const [showName, setShowName] = useState(true);
  const { user, loading } = useSelector((state) => state.users);

  const userInfo = {
    name: 'John Doe',
    img: '',
    designation: 'Client',
    details: [
      { title: 'Account ID', value: '123' },
      { title: 'Email', value: 'Paul@Fakemail.com' },
      { title: 'Language', value: 'English' },
    ],
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="bg-[#1E1E2D] rounded-lg admin-details__user-card">
          {/* IMAGE + NAME */}
          <div className="admin-details__user-card-img">
            <div className="admin-details__user-card-img-box h-[120px] w-[120px] flex items-center justify-center">
              {userInfo?.img && userInfo?.img?.length && !showName ? (
                <img
                  src={user && user.imageUrl}
                  alt={user && user.userName}
                  onLoad={() => setShowName(false)}
                  onError={() => setShowName(true)}
                  className="h-full w-full"
                />
              ) : (
                <div className="text-[36px] text-white">
                  {showName && getName({ user: { fullName: userInfo?.name } })}
                </div>
              )}
            </div>
            {/* NAME */}
            <div className="admin-details__user-card-name">
              <h6 className="text-xl text-[#fff]">{user?.name}</h6>
            </div>
            {/* DESIGNATION */}
            <div className="admin-details__user-card-designation">
              <p className="text-[#474761] text-base">
                {userInfo?.designation}
              </p>
            </div>
          </div>
          {/* USER PROFILE DETAILS */}
          <div className="admin-details__user-card-details px-8">
            {/* FIRST ROW WITH EDIT BUTTON */}
            <div className="flex justify-between items-center">
              <h6 className="text-white text-[16px] mb-0">{'Details'}</h6>
              <button className="bg-[#212E48] rounded-lg px-4 py-2 text-[#3699FF] mb-0">
                Edit
              </button>
            </div>
            <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-4 mb-4" />
            {/* INFO ROW */}
            <div className="admin-details__user-card-details-detail flex flex-col gap-4">
              {userInfo?.details?.map(({ title, value }) => {
                return (
                  <div className="flex flex-col gap-1" key={title}>
                    <div className="text-white text-sm">{title}</div>
                    <div className="text-[#92928F] text-sm">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
