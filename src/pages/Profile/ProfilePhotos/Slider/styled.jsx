import styled from 'styled-components';
import COLORS from '../../../../constants';

export const SliderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3% 0 3%;
  overflow: hidden;
`;

export const ImgBox = styled.div`
  padding: 3% 0 3%;
  align-self: center;
  
  img {
    max-width: 400px; 
  }
`;

export const GalleryContainer = styled.div`
  padding: .9375rem 0;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
  @include bp( x-small ) {
    grid-template-columns: repeat(1, 1fr);
  }\t  
  @include bp( small ) {
    grid-template-columns: repeat(2, 1fr);
  }\t
  // When above our large breakpoint, make sure we have 3 columns
  @include bp( large ) {
    grid-template-columns: repeat(3, 1fr);
  }\t
  img {
    width: 100%;
    border: 5px solid #fff;
  }
  
  div {
    position: relative;
    cursor: pointer;
    &:before, &:after {
      transition: .3s opacity ease;
      opacity: 0;
    }
    &:after {
      content: '\\02194';
      font-size: 80px;
      position: absolute;
      transform: translate3d(-50%, -50%, 0) rotate(-45deg);
      color: ${COLORS.YELLOW};
      left: 50%;
      top: 50%;
      display: block;
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 4px;
      left: 0;
      right: 0;
      display: block;
    }
    &:hover {
      &:before, &:after {
        opacity: 1;
        transition: .3s opacity ease;
      }
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 999;
  width: 50%;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  img {
    max-width: 70vw;
    border: 5px solid #fff;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
`;

export const ModalBody = styled.div`
  display:flex;
  justify-content: center;
  align-self: center;
  position: relative;
  & a {
    position: absolute;
    display: inline;
    color: $black;
    text-decoration: none;
    line-height: 36px;
    font-size: 30px;
    font-weight: lighter;
    background: #fff;
    border-radius: 5px;
    height: 40px; width: 40px;
    text-align: center;
  }
  
  & .modal-close {
    right: 0; top: 0;
    border-radius: 0 0 0 5px;
    color: ${COLORS.PINK};
    &:active {
      color: ${COLORS.GRAY};
    }
  }
  
  & .modal-next,
  & .modal-prev {
  right: 0; top: calc(50% - 25px);
  border-radius: 5px 0 0 5px;
  height: 50px;
  line-height: 40px;
  font-size: 60px;
  color: ${COLORS.PINK};
  &:active {
    color: ${COLORS.GRAY};
  }
}
  & .modal-prev {
    left: 0;
    right: auto;
    border-radius: 0 5px 5px 0;
  }
`;
