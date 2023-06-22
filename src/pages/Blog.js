// pages/Blog.js
import React from 'react';
import Layout from '../layout';
import GenericGallery from '../components/GenericGallery';
import TextCard from '../components/TextCard';

const Blog = () => {
  const dbRef = 'Writings'; // Reference to the 'Blog' node in your Firebase database
  const CardComponent = TextCard; // Use the TextCard component to render each item
  const headline = 'Blog';
  const tabOptions = ['All', 'Category1', 'Category2', 'Category3'];
  const itemsCountPerPage = 6;

  const sidebar = <p>This is the sidebar content for the Blog page.</p>;

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

export default Blog;