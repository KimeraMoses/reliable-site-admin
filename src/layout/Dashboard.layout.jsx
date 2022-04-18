import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { element, bool } from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { SideBar, TopBar } from './components';
import { sidebarData } from './components/SideBar/data';
import { GetMFAUri } from 'store/Actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';

export function DashboardLayout({ children, hide }) {
  const [active, setActive] = useState('');
  const user = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const [hideSide, setHideSide] = useState(!!lessThanDesktop);

  useEffect(() => {
    const activeLink = sidebarData.filter((sideItem) => {
      return sideItem.path === pathname;
    });
    setActive(activeLink[0]);
  }, [pathname]);

  // useEffect(() => {
  //   dispatch(GetMFAUri(user && user.id));
  // }, [user, dispatch]);

  const toggleSide = () => {
    setHideSide((state) => !state);
  };

  return (
    <div className="w-full md:min-h-screen">
      <TopBar hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
      <div className="flex">
        {!hide && (
          <div className="col-auto">
            <SideBar hideSide={hideSide} />
          </div>
        )}
        <div className="col">
          <div className="bg-[#1A1A27] p-4 md:px-6">
            <h2 className="text-xl font-normal text-white">{active?.name}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: element.isRequired,
  hide: bool,
};

DashboardLayout.defaultProps = {
  hide: false,
};
