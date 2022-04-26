import './AdminDetails.styles.scss';
import { useState } from 'react';
import {
  UserProfileCard,
  SubUsers,
  Navigation,
  // Overview
  AssignedTickets,
  PastEmails,
  // User Permissions
  UserPermissions,
  // API Keys
  APIKeys,
  // Settings
  Settings,
  LoginSessions,
  Logs,
} from './sections';

export const AdminDetails = () => {
  const [active, setActive] = useState('Overview');

  const links = [
    { label: 'Overview', onClick: () => setActive('Overview') },
    { label: 'User Permissions', onClick: () => setActive('User Permissions') },
    { label: 'API Keys', onClick: () => setActive('API Keys') },
    { label: 'SETTINGS', onClick: () => setActive('SETTINGS') },
    { label: 'EVENT LOGS', onClick: () => setActive('EVENT LOGS') },
  ];

  return (
    <div className="users">
      <div className="admin-details">
        <div className="admin-details__left">
          {/* USER PROFILE CARD */}
          <UserProfileCard />
          <div className="mt-4">
            <SubUsers />
          </div>
        </div>
        <div className="admin-details__right">
          <Navigation active={active} links={links} />
          {active === 'Overview' ? (
            <>
              <AssignedTickets />
              <PastEmails />
            </>
          ) : (
            <></>
          )}
          {active === 'User Permissions' ? <UserPermissions /> : <></>}
          {active === 'API Keys' ? <APIKeys /> : <></>}
          {active === 'SETTINGS' ? <Settings /> : <></>}
          {active === 'EVENT LOGS' ? (
            <>
              <LoginSessions />
              <Logs />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
