import './ClientDetails.styles.scss';
import { useState } from 'react';
import {
  UserProfileCard,
  SubUsers,
  Navigation,
  // Overview
  AssignedTickets,
  PastEmails,
  ProductsServices,
  // Events & Logs
  EventsLogs,
} from './sections';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

export const ClientDetails = () => {
  // const { t } = useTranslation('/Bills/ns');

  const [active, setActive] = useState('EVENTS & LOGS');

  const links = [
    { label: 'OVERVIEW', onClick: () => setActive('OVERVIEW') },
    { label: 'EVENTS & LOGS', onClick: () => setActive('EVENTS & LOGS') },
    {
      label: 'ACCOUNT STATEMENT',
      onClick: () => setActive('ACCOUNT STATEMENT'),
    },
  ];

  const { loading, user } = useSelector((state) => state?.auth);

  const { id } = useParams();
  console.log(id);

  return (
    <div className="users">
      <div className="admin-details min-w-[60vh]">
        {loading || user === null ? (
          <Spin
            size="large"
            style={{ gridColumn: '1/3', alignSelf: 'center' }}
          />
        ) : (
          <>
            <div className="admin-details__left">
              {/* USER PROFILE CARD */}
              <UserProfileCard />
              <div className="mt-4">
                <SubUsers />
              </div>
            </div>
            <div className="admin-details__right">
              <Navigation active={active} links={links} />
              {active === 'OVERVIEW' ? (
                <>
                  <ProductsServices />
                  <AssignedTickets />
                  <PastEmails />
                </>
              ) : (
                <></>
              )}
              {active === 'EVENTS & LOGS' ? <EventsLogs /> : <></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
