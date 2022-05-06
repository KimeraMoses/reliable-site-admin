// import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation, ProfileDetails, SigninMethods, APIKeys } from './sections';
import './style.scss';

export const UserProfile = () => {
  const [tab, setTab] = useState('API Keys');
  // const { t } = useTranslation('/UserProfile/ns');

  const items = [
    { name: 'Settings', onClick: () => setTab('Settings') },
    { name: 'API Keys', onClick: () => setTab('API Keys') },
    { name: 'Logs', onClick: () => setTab('Logs') },
  ];

  let Component = () => <></>;
  switch (tab) {
    case 'Settings':
      Component = () => (
        <>
          <ProfileDetails />
          <SigninMethods />
        </>
      );
      break;
    case 'API Keys':
      Component = () => <APIKeys />;
      break;
    case 'Logs':
      Component = () => <>Logs</>;
      break;
    default:
      Component = () => <>Settings</>;
  }

  return (
    <div className="userprofile">
      <Navigation items={items} active={tab} />
      <Component />
    </div>
  );
};
