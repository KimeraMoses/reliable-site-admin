import React from 'react';
import { useTranslation } from 'react-i18next';

function UnauthorizedAccess() {
  const { t } = useTranslation('/UnauthorizedAccessPage/ns');
  return (
    <div className="d-flex h-screen ">
      <div className="col-md-6 my-auto p-10 md:p-20">
        <div>
          <img
            src="/icon/logo.svg"
            alt={t('suspendedTitle')}
            className="w-20 h-20"
          />
          <h3 className="text-4xl text-white font-normal mt-5">{t('title')}</h3>
          <p className="custom-text-light border-b-1 border-indigo-900 mb-5 text-base border-dashed-bottom pb-5">
            {t('description1')}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-white text-base">{t('subTitle')}</h3>
          <p className="custom-text-light border-b-1 border-indigo-900 mb-5 text-base">
            {t('description2')}
          </p>
        </div>
        <div className="countdown text-4xl text-white">
          <span>00</span> : <span>06</span> : <span>30</span> : <span>30</span>
        </div>
      </div>
      <div className="col d-none d-md-flex bg-custom-secondary flex items-center justify-center">
        <img src="/icon/unauthorized-access.svg" alt="" />
      </div>
    </div>
  );
}

export default UnauthorizedAccess;
