import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { element, bool } from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { SideBar, TopBar } from './components';
import { sidebarData } from './components/SideBar/data';
import { GetMFAUri } from 'store/Actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';

export function DashboardLayout({ children, hide }) {
  const [active, setActive] = useState('');
  const [activeSub, setActiveSub] = useState('');
  const [activeInnerSub, setActiveInnerSub] = useState('');
  const [activeDeepInnerSub, setActiveDeepInnerSub] = useState('');
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
    if (activeLink?.length && activeLink[0]?.subLinks?.length) {
      const activeSubLink = activeLink[0].subLinks.filter((subItem) => {
        const { path } = subItem;
        return pathname.includes(path);
      });
      setActiveSub(activeSubLink[0]);

      if (activeSubLink?.length && activeSubLink[0]?.subLinks?.length) {
        const activeInnerSubLink = activeSubLink[0]?.subLinks?.filter(
          ({ path }) => {
            const trimmedPathname = path.substring(0, path.lastIndexOf('/'));
            return pathname.includes(trimmedPathname);
          }
        );
        setActiveInnerSub(activeInnerSubLink[0]);
        // Set Deep Inner Sub Link
        if (
          activeInnerSubLink?.length &&
          activeInnerSubLink[0]?.subLinks?.length
        ) {
          const activeDeepInnerSubLink =
            activeInnerSubLink[0]?.subLinks?.filter(({ path }) => {
              const trimmedPathname = path.substring(0, path.lastIndexOf('/'));
              return pathname.includes(trimmedPathname);
            });
          setActiveDeepInnerSub(activeDeepInnerSubLink[0]);
        } else {
          setActiveDeepInnerSub('');
        }
      } else {
        setActiveInnerSub('');
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (user) {
      dispatch(GetMFAUri(user.id));
    }
  }, [user, dispatch]);

  const toggleSide = () => {
    setHideSide((state) => !state);
  };

  return (
    <div className="w-full md:min-h-screen">
      <TopBar
        hide={hide}
        hideSide={hideSide}
        toggleSide={toggleSide}
        innerSubLinks={
          activeSub && activeSub.showDropdown ? activeSub.subLinks : []
        }
      />
      <div className="flex">
        {!hide && (
          <div className="col-auto">
            <SideBar hideSide={hideSide} />
          </div>
        )}
        <div className="col">
          <div className="bg-[#1A1A27] px-[20px] py-[20px] md:px-[40px] flex items-center gap-5">
            <h2 className="text-xl font-normal text-white">{active?.name}</h2>

            {activeSub?.name && !active.hideBread ? (
              <>
                <div className="h-5 w-[1px] bg-[#323248]" />
                <h6 className="text-white text-[12px]">
                  <Link
                    to={activeSub?.path}
                    className={activeSub?.name ? 'text-[#92928f]' : ''}
                  >{`${activeSub?.name} ${
                    activeInnerSub?.name ? '-' : ''
                  } `}</Link>

                  {activeInnerSub?.name && !activeDeepInnerSub ? (
                    <span>{`${activeInnerSub?.name} ${
                      activeDeepInnerSub ? '-' : ''
                    } `}</span>
                  ) : activeInnerSub?.name && activeDeepInnerSub ? (
                    <Link
                      to={activeInnerSub?.path}
                      className={activeInnerSub?.name ? 'text-[#92928f]' : ''}
                    >{`${activeInnerSub?.name} ${
                      activeInnerSub?.name ? '-' : ''
                    } `}</Link>
                  ) : (
                    ''
                  )}

                  {activeDeepInnerSub?.name ? (
                    <span>{`${activeDeepInnerSub?.name}`}</span>
                  ) : (
                    ''
                  )}
                </h6>
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
