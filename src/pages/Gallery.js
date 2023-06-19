// pages/Gallery.js
import React from 'react';
import Layout from '../layout';
import GalleryGrid from '../components/galleryGrid';

const Gallery = () => {
  const headline = "Gallery";
  const sidebar = <p>This is the sidebar content for the Gallery page.</p>;
  const main = <GalleryGrid />;

  return (
    <Layout headline={headline} sidebar={sidebar} main= {main} />
  );
};

export default Gallery;