import styled from 'styled-components';
import COLORS from '../../constants';

export const Modal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

export const AddDataRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  
  & label {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  color: ${COLORS.DARK};
  margin: 10px;
    & input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: rgba(255,255,255,0.1);
      border-radius: 13px;
      outline: none;
      width: 190px;
      height: 40px;
      text-align: center;
      font-size: 16px;
      color: black;
    }
  }
`;

export const ModalAddDataStyled = styled.div`
  position: absolute;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 16%;
  margin-left: -35%;
  background-color: ${COLORS.LIGHT_GRAY};
  border-radius: 13px;
  padding: 5px;
`;
