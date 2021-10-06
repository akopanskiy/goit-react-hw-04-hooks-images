import { useState, useEffect } from 'react';

import SearchBar from './component/SearchBar';
import ImageGallery from './component/ImageGallery';
import Button from './component/Button';
import Spin from './component/Loader';
import Modal from './component/Modal';
import imageApi from './services/imageApi';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (page > 2) {
      scrollWindow();
    }
  }, [page]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const fetchImages = () => {
    setIsLoading(true);

    imageApi(searchQuery, page)
      .then(hits => {
        setImages(images => [...images, ...hits]);
        setPage(page => page + 1);
      })
      .finally(() => setIsLoading(false));
  };
  const scrollWindow = () => {
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const openBigImage = url => {
    setModalImage(url);
    toggleModal();
  };

  return (
    <>
      <SearchBar onSubmit={onChangeQuery} />

      <ImageGallery items={images} toggle={openBigImage} />

      {images.length > 0 && !isLoading && <Button onClick={fetchImages} />}
      {isLoading && <Spin />}
      {showModal && <Modal onClose={toggleModal} bigImage={modalImage} />}
    </>
  );
}
