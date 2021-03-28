import React from 'react';
import ReactDOM from 'react-dom';
import {  Modal } from './styled';
import { ModalAddDataStyled } from './styled';
import CommonInfo from './steps/CommonInfo';
import ProfilePhoto from './steps/ProfilePhoto';
import COLORS from '../../constants';
import { MyLink } from '../../styled';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const ModalAddData = ({ userData, setIsProfilePhotoEmpty, setIsRequiredEmpty }) => {
  const portalRoot = document.getElementById('portal');
  const [stepNumber, setStepNumber] = React.useState(1);

  return ReactDOM.createPortal(
    <Modal>
      <ModalAddDataStyled>
        {stepNumber === 1 && <CommonInfo setIsRequiredEmpty={setIsRequiredEmpty} userData={userData} setStepNumber={setStepNumber} />}
        {(stepNumber === 2) && (
          <>
            <ProfilePhoto setIsProfilePhotoEmpty={setIsProfilePhotoEmpty} />
            <MyLink onClick={() => setStepNumber(1)} color={COLORS.DARK}><KeyboardBackspaceIcon/> На шаг 1/2</MyLink>
          </>
        )}
      </ModalAddDataStyled>
    </Modal>,
    portalRoot,
  );
};

export default ModalAddData;
