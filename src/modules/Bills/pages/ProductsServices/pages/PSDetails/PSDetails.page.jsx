import './PSDetails.styles.scss';
import { useState } from 'react';
import { Navigation, Sidebar } from './sections';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

export const PSDetails = () => {
  const location = useLocation();
  const product = location?.state?.product;

  console.log(product);

  const [active, setActive] = useState('GENERAL SETTINGS');

  const links = [
    { label: 'GENERAL SETTINGS', onClick: () => setActive('GENERAL SETTINGS') },
    {
      label: 'ADVANCED SETTINGS',
      onClick: () => setActive('ADVANCED SETTINGS'),
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
              {/* THUMBNAIL + STATUS + PRODUCT DETAILS */}
              <Sidebar />
            </div>
            <div className="admin-details__right">
              <Navigation active={active} links={links} />
              {active === 'GENERAL SETTINGS' ? <>GENERAL SETTINGS</> : <></>}
              {active === 'ADVANCED SETTINGS' ? <>ADVANCED SETTINGS</> : <></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
