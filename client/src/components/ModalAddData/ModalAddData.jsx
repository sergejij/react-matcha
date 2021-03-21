import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '../../pages/Login/styled';

const ModalAddData = (b) => {
  const portalRoot = document.getElementById('portal');
  const [isShownAddData, setIsShownAddData] = React.useState(b);

  const toggleAddData = () => {
    setIsShownAddData((prev) => !prev);
  };

  return isShownAddData && ReactDOM.createPortal(
    <Modal>
      Hello world
    </Modal>,
    portalRoot,
  );
};

export default ModalAddData;
