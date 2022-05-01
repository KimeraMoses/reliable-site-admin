import './AdminDetails.styles.scss';
import { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserById } from 'store';

export const AdminDetails = () => {
  const { t } = useTranslation('/Users/ns');

  const [active, setActive] = useState(t('userPermissions'));

  const links = [
    { label: t('overview'), onClick: () => setActive(t('overview')) },
    {
      label: t('userPermissions'),
      onClick: () => setActive(t('userPermissions')),
    },
    { label: t('apiKeys'), onClick: () => setActive(t('apiKeys')) },
    { label: t('settings'), onClick: () => setActive(t('settings')) },
    { label: t('eventLogs'), onClick: () => setActive(t('eventLogs')) },
  ];

  const { loading, user } = useSelector((state) => state?.users);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  return (
    <div className="users">
      <div className="admin-details">
        {loading || user === null ? (
          <Spin size="large" />
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
              {active === t('overview') ? (
                <>
                  <AssignedTickets />
                  <PastEmails />
                </>
              ) : (
                <></>
              )}
              {active === t('userPermissions') ? <UserPermissions /> : <></>}
              {active === t('apiKeys') ? <APIKeys /> : <></>}
              {active === t('settings') ? <Settings /> : <></>}
              {active === t('eventLogs') ? (
                <>
                  <LoginSessions />
                  <Logs />
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
