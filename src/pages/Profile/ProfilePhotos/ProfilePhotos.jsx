import React from 'react';
import Gallery from 'react-photo-gallery';
import ProfilePhotosStyled from './styled';

const PHOTO_SET = [
  {
    src: 'https://www.ecartelera.com/images/sets/9000/9004.jpg',
    width: 4,
    height: 3,
  },
  {
    src: 'https://i.ytimg.com/vi/NpsI_KG9WJA/maxresdefault.jpg',
    width: 2,
    height: 1,
  },
  {
    src: 'https://avatars.mds.yandex.net/get-zen_doc/1581919/pub_5dfcfc60b477bf00af3fc129_5dfcfdddaad43600aefe783d/scale_1200',
    width: 3,
    height: 2,
  },
  {
    src: 'https://image.tmdb.org/t/p/original/uOuh66L1sHpWrbBpB9KvwACEwyl.jpg',
    width: 3,
    height: 2,
  },
  {
    src: 'https://avatars.mds.yandex.net/get-zen_doc/1581919/pub_5dfcfc60b477bf00af3fc129_5dfcfdddaad43600aefe783d/scale_1200',
    width: 3,
    height: 2,
  },
];

const ProfilePhotos = () => (
  <ProfilePhotosStyled>
    <Gallery photos={PHOTO_SET} />
  </ProfilePhotosStyled>
);

export default ProfilePhotos;
