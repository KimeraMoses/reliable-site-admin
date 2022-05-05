import React, { useEffect, useState } from 'react';
import UserTop from './UserTop.component';
import Logo from './Logo.component';
import { sidebarData } from '../SideBar/data';
import { Link, useLocation } from 'react-router-dom';

export function TopBar({ hide = false, hideSide, toggleSide }) {
  const [active, setActive] = useState(null);

  const { pathname } = useLocation();

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
  }, [pathname]);

  return (
    <div className="h-20 w-full bg-custom-secondary flex items-center">
      <Logo hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
      <div
        className={`flex items-center ${
          active?.subLinks?.length ? 'justify-between' : 'justify-end'
        }`}
        style={{ width: hideSide ? 'calc(100% - 84px)' : 'calc(100% - 300px)' }}
      >
        {active?.subLinks?.length ? (
          <div className="flex items-center gap-4 ml-[40px]">
            {active?.subLinks.map((link) => (
              <Link
                to={link?.path}
                key={link?.path}
                className={`${
                  pathname.includes(link?.path)
                    ? 'bg-[#1b1b2b] text-[#3699FF]'
                    : 'text-[#92928F]'
                } rounded-lg py-2 px-4 hover:bg-[#1b1b2b] hover:text-[#3699FF]`}
              >
                {link?.name}
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
        <UserTop />
      </div>
    </div>
  );
}
