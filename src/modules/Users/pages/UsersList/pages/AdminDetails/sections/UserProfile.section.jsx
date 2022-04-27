import { useTranslation } from 'react-i18next';

export const UserProfileCard = () => {
  const { t } = useTranslation('Users/ns');

  const userInfo = {
    name: 'Paul.Elliott',
    img: 'https://via.placeholder.com/100',
    designation: 'Aministrator',
    details: [
      { title: t('accountID'), value: 'ID-45453423' },
      { title: t('billingEmail'), value: 'info@mind2matter.com' },
      {
        title: t('billingAddress'),
        value: '101 Collin Street, Melbourne 3000, Australia',
      },
      { title: t('language'), value: 'English' },
      { title: t('upcomingInvoice'), value: '54238-8693' },
    ],
  };

  return (
    <div className="bg-[#1E1E2D] rounded-lg admin-details__user-card">
      {/* IMAGE + NAME */}
      <div className="admin-details__user-card-img">
        <div className="admin-details__user-card-img-box">
          <img
            className="admin-details__user-card-img-box-el"
            src={userInfo?.img}
            alt="user"
          />
        </div>
        {/* NAME */}
        <div className="admin-details__user-card-name">
          <h6 className="text-xl text-[#fff]">{userInfo?.name}</h6>
        </div>
        {/* DESIGNATION */}
        <div className="admin-details__user-card-designation">
          <p className="text-[#474761] text-base">{userInfo?.designation}</p>
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
              <div className="flex flex-col gap-1">
                <div className="text-white text-sm">{title}</div>
                <div className="text-[#92928F] text-sm">{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
