import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, previewImage, toggle }) => {
  return (
    <li key={id} className={styles.ImageGalleryItem} onClick={toggle}>
      <img src={previewImage} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;
