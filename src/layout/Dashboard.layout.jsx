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
  const [activeSub, setActiveSub] = useState('');
  const user = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const [hideSide, setHideSide] = useState(!!lessThanDesktop);

  useEffect(() => {
    const activeLink = sidebarData.filter((sideItem) => {
      const { name, path } = sideItem;
      if (name === 'Dashboard') {
        return path === pathname;
      } else {
        return pathname.includes(path);
      }
    });
    setActive(activeLink[0]);

    // Set Sublink
    if (activeLink[0]?.subLinks) {
      const activeSubLink = activeLink[0].subLinks.filter((subItem) => {
        const { path } = subItem;
        return pathname.includes(path);
      });
      setActiveSub(activeSubLink[0]);
    }
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
          <div className="bg-[#1A1A27] p-4 md:px-6 flex items-center gap-5">
            <h2 className="text-xl font-normal text-white">{active?.name}</h2>

            {activeSub?.name ? (
              <>
                <div className="h-5 w-[1px] bg-[#323248]" />
                <h6 className="text-white text-[12px]">{activeSub?.name}</h6>
              </>
            ) : (
              <></>
            )}
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
