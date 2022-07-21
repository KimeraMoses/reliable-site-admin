import { Statistic } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './UnderMaintenance.styles.scss';

const { Countdown } = Statistic;

function UnderMaintenance() {
  const { t } = useTranslation('/UnderMaintenancePage/ns');
  const [finished, setFinished] = useState(false);
  const { maintenanceDetails } = useSelector((state) => state?.settings);
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="my-auto p-10 md:p-20">
        <img
          src="/icon/logo.svg"
          alt={t('suspendedTitle')}
          className="w-20 h-20"
        />
        <h3 className="text-4xl text-white mt-5">{t('title')}</h3>
        <p className="custom-text-light text-base mb-5 pb-5 border-dashed-bottom">
          {maintenanceDetails?.reason}
        </p>
        <div className="countdown">
          {finished ? (
            <div className="ant-statistic-content">
              <div
                className="text-blue-500 text-2xl"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </div>
            </div>
          ) : (
            <Countdown
              value={maintenanceDetails?.expirationDate}
              format="DD : HH : mm : ss"
              onFinish={() => setFinished(true)}
            />
          )}
        </div>
        {/* <div className="countdown text-4xl text-white">
          <Countdown value={maintenanceDetails?.expirationDate} />
          <span>00</span> : <span>06</span> : <span>30</span> : <span>30</span>
        </div> */}
      </div>
      <div className="bg-custom-secondary flex align-items-center justify-content">
        <img src="/icon/under-maintenance.svg" alt="" className="mx-auto" />
      </div>
    </div>
  );
}

export default UnderMaintenance;
