import { Modal as BSModal, Button } from 'react-bootstrap';
import './Modal.styles.scss';

export function Modal({ show, setShow, heading, children }) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <BSModal show={show} onHide={handleClose} className="modal">
      <BSModal.Body className="modal__bg">
        <div className="modal__header">
          <h3>{heading}</h3>
        </div>
        <div className="modal__divider" />
        <div className="modal__body">{children}</div>
      </BSModal.Body>
    </BSModal>
  );
}
