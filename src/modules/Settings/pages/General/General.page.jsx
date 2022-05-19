import React from 'react';
import { GeneralSettings, MFASettings } from './sections';

function General() {
  return (
    <div className="p-[40px]">
      <GeneralSettings />
      <MFASettings />
    </div>
  );
}

export default General;
