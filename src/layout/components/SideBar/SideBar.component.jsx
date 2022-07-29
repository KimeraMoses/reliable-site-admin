import React, { Fragment } from 'react';
import SideLinks from './SideLinks.component';
import './SideBar.styles.scss';
// import { useSelector } from 'react-redux';
import { useSidebarData } from './data';
// import { checkModule } from 'lib/checkModule';
import { Spin } from 'antd';

export function SideBar({ hideSide }) {
  // const userLevelModules = useSelector((state) => state?.modules?.userModules);

  const sidebarData = useSidebarData();

  return (
    <Spin spinning={sidebarData?.length === 0}>
      <div
        className={`sidebar bg-custom-secondary transition-all pt-[20px] ${
          hideSide ? 'w-[95px]' : 'w-[300px]'
        }`}
      >
        <ul className="p-0">
          {sidebarData.map(
            ({ name, module, path, hideInSide, icon, count, show }) => {
              return (
                <Fragment key={path}>
                  {/* TODO: Remove or operator and module variable once all modules are included */}
                  {show ? (
                    <SideLinks
                      name={name}
                      path={path}
                      icon={icon}
                      count={count}
                      hideSide={hideSide}
                      hideInSide={hideInSide}
                    />
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            }
          )}
        </ul>
      </div>
    </Spin>
  );
}
