import React from 'react';
import GenericGallery from '../components/GenericGallery';
import GalleryCard from '../components/galleryCard'; // This is the existing card component for the gallery

const Gallery = () => {
  const dbRef = 'Art'; // Reference to the 'Art' node in your Firebase database
  const CardComponent = GalleryCard; // Use the GalleryCard component to render each item
  const headline = 'Gallery';
  const tabOptions = ['All', '3d Character', 'Product design', 'Art'];
  const itemsCountPerPage = 6;

  return (
    <GenericGallery
      dbRef={dbRef}
      CardComponent={CardComponent}
      headline={headline}
      tabOptions={tabOptions}
      itemsCountPerPage={itemsCountPerPage}
    />
  );
};

export default Gallery;