import React, { useState } from 'react';
import { DashboardLayout } from 'layout';
import { Modal } from 'components';
import { Button } from 'react-bootstrap';
// import './Home.styles.scss';

function Users() {
  const [show, setShow] = useState(false);
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-width: 1400px)',
  // });

  return (
    <DashboardLayout>
      <Modal setShow={setShow} show={show} heading="Add New User">
        THIS IS MODAL BODY
      </Modal>
      <div className="p-4 md:px-6 dashboard">
        <Button onClick={() => setShow(true)}>Open Modal</Button>
      </div>
    </DashboardLayout>
  );
}
export default Users;
