import React from 'react';
import ReactDOM from 'react-dom';
import { AddDataRow, Modal } from './styled';
import { ModalAddDataStyled } from './styled';
import Button from '../Button';


const userInfo = {
  post: "Место работы",
  location: "Место жительства",
  age: "Возраст",
  sex: "Пол",
  relationshipStatus: "Статус отношений",
  sexPreference: "Сексульные предпочтения",
  alcoholAttitude: "Отношение к алкоголю",
  smokingAttitude: "Отношение к курению",
  biography: "О себе",
}

const ModalAddData = () => {
  const portalRoot = document.getElementById('portal');

  return ReactDOM.createPortal(
    <Modal>
      <ModalAddDataStyled>
        <h2>Добавьте информацию о себе</h2>
        <AddDataRow>
          <label htmlFor="post">
            Место работы
            <input id="post" type="text" />
          </label>

          <label htmlFor="location">
            Место жительства
            <input id="location" type="text" />
          </label>

          <label htmlFor="age">
            Возраст
            <input id="age" type="number" />
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="sex">
            Пол
            <input id="sex" type="text" />
          </label>

          <label htmlFor="relationshipStatus">
            Статус отношений
            <input id="relationshipStatus" type="text" />
          </label>

          <label htmlFor="sexPreference">
            Сексульные предпочтения
            <input id="sexPreference" type="text" />
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="alcoholAttitude">
            Отношение к алкоголю
            <input id="alcoholAttitude" type="text" />
          </label>

          <label htmlFor="smokingAttitude">
            Отношение к курению
            <input id="smokingAttitude" type="text" />
          </label>
        </AddDataRow>

        <AddDataRow>
          <label htmlFor="biography">
            О себе
            <textarea rows="2" cols="100" id="biography" />
          </label>
        </AddDataRow>


        <Button view="main" size="M" color="yellow">
          Сохранить
        </Button>
      </ModalAddDataStyled>
    </Modal>,
    portalRoot,
  );
};

export default ModalAddData;
