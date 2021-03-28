import React from 'react';
import {
  GalleryContainer, GalleryGrid, Modal, ModalBody, ModalOverlay,
} from './styled';

export default ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const openModal = (e, index) => {
    setCurrentIndex(index);
  };

  const closeModal = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setCurrentIndex(null);
  };

  const findPrev = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setCurrentIndex((prevState) => (prevState - 1));
  };

  const findNext = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setCurrentIndex((prevState) => (prevState + 1));
  };

  const renderImageContent = (src, index) => (
    <div key={index} onClick={(e) => openModal(e, index)}>
      <img src={src} alt="img" />
    </div>
  );


  return (
    <GalleryContainer>
      <GalleryGrid>
        {images.map(renderImageContent)}
      </GalleryGrid>
      <GalleryModal
        closeModal={closeModal}
        findPrev={findPrev}
        findNext={findNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex + 1 < images.length}
        src={images[currentIndex]}
      />
    </GalleryContainer>
  );
};

const GalleryModal = ({
  closeModal, hasPrev, hasNext, findPrev, findNext, src,
}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
    if (e.keyCode === 37 && hasPrev) {
      findPrev();
    }
    if (e.keyCode === 39 && hasNext) {
      findNext();
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!src) {
    return null;
  }

  return (
    <div>
      <ModalOverlay onClick={closeModal} />
      <Modal isOpen={!!src}>
        <ModalBody>
          <a href="#" className="modal-close" onClick={closeModal} onKeyDown={handleKeyDown}>&times;</a>
          {hasPrev && <a href="#" className="modal-prev" onClick={findPrev} onKeyDown={handleKeyDown}>&lsaquo;</a>}
          {hasNext && <a href="#" className="modal-next" onClick={findNext} onKeyDown={handleKeyDown}>&rsaquo;</a>}
          <img src={src} alt="asf" />
        </ModalBody>
      </Modal>
    </div>
  );
};
