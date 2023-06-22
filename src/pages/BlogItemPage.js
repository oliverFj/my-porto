// BlogItemPage.js
import React from 'react';
import GenericItemPage from './GenericItemPage';

const BlogItemPage = () => {
  const dbRef = 'Writings'; // Reference to the 'Blog' node in your Firebase database

  const renderSidebar = (item) => (
    <div className="w-full">
      <div className="flex  items-center h-12 text-left border-b-2 border-black text-black font-bold p-2">
        {item.type}
      </div>
    </div>
  );

  const renderMain = (item) => {
    console.log(item.text); // Add this line
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
      </div>
    );
  };

  return (
    <GenericItemPage
      dbRef={dbRef}
      renderSidebar={renderSidebar}
      renderMain={renderMain}
    />
  );
};

export default BlogItemPage;