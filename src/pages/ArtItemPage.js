// ArtItemPage.js
import React from 'react';
import GenericItemPage from './GenericItemPage';

const ArtItemPage = () => {
  const dbRef = 'Art'; // Reference to the 'Art' node in your Firebase database

  const renderSidebar = (item) => (
    <div className="w-full">
      <div className="flex  items-center h-12 text-left border-b-2 border-black text-black font-bold p-2">
        {item.type}
      </div>

      <div className="flex items-center h-12 text-left border-b-2 border-black text-black font-bold p-2">
        {item.tools}
      </div>

      <div className="flex items-center min-h-12 text-left border-b-2 border-black text-black p-2">
        {item.description}
      </div>       
    </div>
  );

  const renderMain = (item) => (
    <div>
      <div dangerouslySetInnerHTML={{ __html: item.link }}></div>
    </div>
  );

  return (
    <GenericItemPage
      dbRef={dbRef}
      renderSidebar={renderSidebar}
      renderMain={renderMain}
    />
  );
};

export default ArtItemPage;