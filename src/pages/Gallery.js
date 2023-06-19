// pages/Gallery.js
import React from 'react';
import Layout from '../layout';

const Gallery = () => {
  const headline = "Gallery";
  const sidebar = <p>This is the sidebar content for the Gallery page.</p>;
  const main = <p>This is the main content for the Gallery page.</p>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default Gallery;