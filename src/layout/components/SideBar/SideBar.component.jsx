import React, { Fragment } from 'react';
import SideLinks from './SideLinks.component';
import QRCode from 'react-qr-code';
import './SideBar.styles.scss';
import { useSelector } from 'react-redux';
import { sidebarData } from './data';
import { checkModule } from 'lib/checkModule';

export function SideBar({ hideSide }) {
  const authenticatorUri = useSelector((state) => state.auth.authUri);
  const userLevelModules = useSelector((state) => state?.modules?.userModules);

  return (
    <div
      className={`sidebar bg-custom-secondary transition-all pt-[20px] ${
        hideSide ? 'w-[95px]' : 'w-[300px]'
      }`}
    >
      <ul className="p-0">
        {sidebarData.map(({ name, module, path, icon }) => {
          const isModulePresent = checkModule({
            modules: userLevelModules,
            module,
          });
          return (
            <Fragment key={path}>
              {/* TODO: Remove or operator and module variable once all modules are included */}
              {isModulePresent || module ? (
                <SideLinks
                  name={name}
                  path={path}
                  icon={icon}
                  hideSide={hideSide}
                />
              ) : (
                <></>
              )}
            </Fragment>
          );
        })}
      </ul>
      {!hideSide && (
        <div className="qr__code">
          <QRCode value={authenticatorUri} title="Scan QR Code to Enable MFA" />
        </div>
      )}
    </div>
  );
}
