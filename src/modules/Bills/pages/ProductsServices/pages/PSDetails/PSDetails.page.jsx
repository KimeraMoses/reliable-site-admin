import './PSDetails.styles.scss';
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
  AccountStatement,
  Settings,
  UserPermissions,
  APIKeys,
} from './sections';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

export const PSDetails = () => {
  // const { t } = useTranslation('/Bills/ns');
  const location = useLocation();
  const product = location?.state?.product;

  console.log(product);

  const [active, setActive] = useState('ACCOUNT STATEMENT');

  const links = [
    { label: 'OVERVIEW', onClick: () => setActive('OVERVIEW') },
    { label: 'PERMISSIONS', onClick: () => setActive('PERMISSIONS') },
    { label: 'API KEYS', onClick: () => setActive('API KEYS') },
    { label: 'SETTINGS', onClick: () => setActive('SETTINGS') },
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
              {active === 'SETTINGS' ? <Settings /> : <></>}
              {active === 'API KEYS' ? <APIKeys /> : <></>}
              {active === 'PERMISSIONS' ? <UserPermissions /> : <></>}
              {active === 'EVENTS & LOGS' ? <EventsLogs /> : <></>}
              {active === 'ACCOUNT STATEMENT' ? <AccountStatement /> : <></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
