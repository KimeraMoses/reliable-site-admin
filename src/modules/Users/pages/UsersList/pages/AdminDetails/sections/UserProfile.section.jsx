import { getName } from 'lib';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const UserProfileCard = () => {
  const { user, loading } = useSelector((state) => state.users);
  const { t } = useTranslation('Users/ns');

  const userInfo = {
    name: user?.fullName,
    img: user?.imageUrl,
    designation: 'Aministrator',
    details: [
      { title: t('accountID'), value: user?.id },
      { title: t('billingEmail'), value: user?.email },
      // {
      //   title: t('billingAddress'),
      //   value: '101 Collin Street, Melbourne 3000, Australia',
      // },
      { title: t('language'), value: 'English' },
      // { title: t('upcomingInvoice'), value: '54238-8693' },
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
              {userInfo?.img && userInfo?.img?.length ? (
                <img
                  src={user && user.imageUrl}
                  alt={user && user.userName}
                  className="h-full w-full"
                />
              ) : (
                <div className="text-[36px] text-white">
                  {getName({ user })}
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
              <h6 className="text-white text-[16px] mb-0">{t('details')}</h6>
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
