import React from 'react';
// import Gallery from 'react-photo-gallery';
import Slider from 'react-slick';
import { ProfilePhotosStyled } from './styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import zero from '../../../assets/images/Profile/0.jpeg';
import first from '../../../assets/images/Profile/1.jpg';
import second from '../../../assets/images/Profile/2.jpg';
import third from '../../../assets/images/Profile/3.jpg';
import fourth from '../../../assets/images/Profile/4.jpg';

const PHOTO_SET = [
  {
    src: first,
    width: 4,
    height: 3,
  },
  {
    src: second,
    width: 2,
    height: 1,
  },
  {
    src: third,
    width: 3,
    height: 2,
  },
  {
    src: fourth,
    width: 3,
    height: 2,
  },
  {
    src: zero,
    width: 3,
    height: 2,
  },
];

const ProfilePhotos = () => {
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    variableWidth: false,
  };
  return (
    <ProfilePhotosStyled>
      <Slider {...settings}>
        {
          PHOTO_SET.map(({ src }) => <img src={src} alt="" />)
        }
      </Slider>
    </ProfilePhotosStyled>
  );
};

export default ProfilePhotos;
