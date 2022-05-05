// import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Navigation, ProfileDetails } from './sections';
import './style.scss';

export const UserProfile = () => {
  const [tab, setTab] = useState('Settings');
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
        </>
      );
      break;
    case 'API Keys':
      Component = () => <>API Keys</>;
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
