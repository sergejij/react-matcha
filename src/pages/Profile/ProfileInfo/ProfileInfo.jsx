import React from 'react';

import {
  ProfileInfoStyled, ProfileInfoBio, ProfileInfoPairs, ProfileInterest, ProfileInterestsStyled,
} from './styled';

const info = [
  { title: 'Пол', value: 'Мужской' },
  { title: 'Статус отношений', value: 'Свободен' },
  { title: 'Сексульное предпочтение', value: 'Женщины' },
  { title: 'Отношение к алкоголю', value: 'Негативное' },
  { title: 'Отношение к курению', value: 'Негативное' },
  { title: 'Рейтинг', value: '1234' },
];

const interests = [
  'vegan', 'piercing', 'geek', '21', '42',
];

const ProfileInterests = () => (
  <>
    <h2>Интересы:</h2>
    <ProfileInterestsStyled>
      {
      interests.map((interest) => <ProfileInterest>{`#${interest}`}</ProfileInterest>)
    }
    </ProfileInterestsStyled>
  </>
);

const ProfileInfo = () => (
  <>
    <ProfileInfoStyled>
      <ProfileInfoPairs>
        {
        info.map((item) => (
          <div>
            <p>
              {`${item.title}:`}
            </p>
            <p className="info-value">{item.value}</p>
          </div>
        ))
      }
      </ProfileInfoPairs>

      <ProfileInfoBio>
        <p>
          Работал в компании Hooli. Создал компанию pied piper.
          Живу в Кремниевой долине, но у меня Дудь не брал интервью :(
          Работал в компании Hooli. Создал компанию pied piper.
          Живу в Кремниевой долине, но у меня Дудь не брал интервью :(
          Работал в компании Hooli. Создал компанию pied piper.
          Живу в Кремниевой долине, но у меня Дудь не брал интервью :(
        </p>
      </ProfileInfoBio>
    </ProfileInfoStyled>
    <ProfileInterests />
  </>
);

export default ProfileInfo;
