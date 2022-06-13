import { useState } from 'react';
import { StepsSection } from './sections';

const WHMCS = () => {
  const [current, setCurrent] = useState(1);
  const onChange = (value) => {
    console.log('onChange:', current);
    setCurrent(value);
  };

  return (
    <div className="grid grid-cols-[1fr_11fr] p-[40px]">
      <StepsSection current={current} />
    </div>
  );
};

export default WHMCS;
