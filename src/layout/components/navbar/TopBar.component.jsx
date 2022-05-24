import React, { Fragment, useEffect, useState } from 'react';
import UserTop from './UserTop.component';
import Logo from './Logo.component';
import { sidebarData } from '../SideBar/data';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';

export function TopBar({ hide = false, hideSide, toggleSide, innerSubLinks }) {
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
          <div className="flex items-center gap-[12px] ml-[40px] overflow-x-scroll xxl:overflow-x-hidden">
            {active?.subLinks.map((link) => {
              const innerLinks = (
                <div className="bg-[#1e1e2d] flex flex-col">
                  {innerSubLinks.map((link) => (
                    <Link
                      to={link?.path}
                      key={link?.path}
                      className={`${
                        pathname.includes(link?.path)
                          ? 'bg-[#1b1b2b] text-[#3699FF]'
                          : 'text-[#92928F]'
                      } py-2 mb-1 px-4 hover:bg-[#1b1b2b] hover:text-[#3699FF]`}
                    >
                      {link?.name}
                    </Link>
                  ))}
                </div>
              );
              return (
                <Fragment key={link?.path}>
                  {innerSubLinks?.length && pathname.includes(link?.path) ? (
                    <Dropdown overlay={innerLinks}>
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
                    </Dropdown>
                  ) : (
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
                  )}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <UserTop />
      </div>
    </div>
  );
}
