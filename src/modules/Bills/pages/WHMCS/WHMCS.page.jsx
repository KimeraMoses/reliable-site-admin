import { useState } from 'react';
import { StepsSection, ValidateForm, WhatToImport } from './sections';

const WHMCS = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="grid grid-cols-[1fr_11fr] p-[40px]">
      <StepsSection current={step} />
      {step === 1 ? <ValidateForm setStep={setStep} /> : <></>}
      {step === 2 ? <WhatToImport setStep={setStep} /> : <></>}
      {step === 3 ? <ValidateForm setStep={setStep} /> : <></>}
    </div>
  );
};

export default WHMCS;
