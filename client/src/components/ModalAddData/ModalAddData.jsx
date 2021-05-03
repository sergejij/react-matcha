import React from 'react';
import ReactDOM from 'react-dom';
import {  Modal } from './styled';
import { ModalAddDataStyled } from './styled';
import CommonInfo from './steps/CommonInfo';
import ProfilePhoto from './steps/ProfilePhoto';
import Interests from './steps/Interests';

const ModalAddData = ({ userData, setIsProfilePhotoEmpty, setIsRequiredEmpty, setNeedToRefresh }) => {
  const portalRoot = document.getElementById('portal');
  const [stepNumber, setStepNumber] = React.useState(1);

  return ReactDOM.createPortal(
    <Modal>
      <ModalAddDataStyled>
        {stepNumber === 1 && <CommonInfo setIsRequiredEmpty={setIsRequiredEmpty} userData={userData} setStepNumber={setStepNumber} />}
        {(stepNumber === 2) && (
          <>
            <Interests setStepNumber={setStepNumber} />
          </>
        )}
        {(stepNumber === 3) && (
          <>
            <ProfilePhoto setStepNumber={setStepNumber} setIsProfilePhotoEmpty={setIsProfilePhotoEmpty} setNeedToRefresh={setNeedToRefresh}/>
          </>
        )}
      </ModalAddDataStyled>
    </Modal>,
    portalRoot,
  );
};

export default ModalAddData;
