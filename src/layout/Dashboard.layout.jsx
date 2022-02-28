import React from 'react';
import { element, bool } from 'prop-types';
import { SideBar, TopBar } from './components';

export function DashboardLayout({ children, hide }) {
  return (
    <div className="w-full md:min-h-screen">
      <TopBar hide={hide} />
      <div className="flex">
        {!hide && (
          <div className="col-auto bg-[#1e1e2d]">
            <SideBar />
          </div>
        )}
        <div className="col">{children}</div>
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
