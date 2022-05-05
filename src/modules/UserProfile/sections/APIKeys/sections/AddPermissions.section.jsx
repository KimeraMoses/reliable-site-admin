import { Modal } from 'components';

export const AddPermissions = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      setShow={setShow}
      heading="API Key Permissions"
      submitText="Create"
    />
  );
};
