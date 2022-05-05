import { useState } from 'react';

import { AddAPIKey } from './AddAPIKey.section';
import { AddPermissions } from './AddPermissions.section';

export const Add = ({ show, setShow }) => {
  const [showPermissions, setShowPermissions] = useState(false);
  return (
    <>
      <AddAPIKey
        show={show}
        setShow={setShow}
        handleSubmit={() => {
          setShow(false);
          setShowPermissions(true);
        }}
      />
      <AddPermissions show={showPermissions} setShow={setShowPermissions} />
    </>
  );
};
