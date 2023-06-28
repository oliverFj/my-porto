import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import Layout from '../layout';

const ItemPage = ({ dbRef, renderSidebar, renderMain }) => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const itemRef = ref(db, `${dbRef}/${id}`);
  
    onValue(itemRef, (snapshot) => {
      const value = snapshot.val();
      console.log('Fetched value:', value); // Log the fetched value
      if (value) {
        setItem({
          id,
          ...value,
        });
      } else {
        console.log('No data at specified database path');
      }
    });
  }, [id, dbRef]);
  
  console.log('Current item:', item); // Log the current item

  if (!item) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  const sidebarContent = renderSidebar(item);
  const mainContent = renderMain(item);

  return (
    <Layout
      headline={item.name || item.title}
      sidebar={sidebarContent && <div>{sidebarContent}</div>}
      main={mainContent}
    />
  );
};

export const ArtItemPage = () => {
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
    <ItemPage
      dbRef={dbRef}
      renderSidebar={renderSidebar}
      renderMain={renderMain}
    />
  );
};

export const BlogItemPage = () => {
    const dbRef = 'Writings'; // Reference to the 'Blog' node in your Firebase database
    const [loading, setLoading] = useState(true);
  
    const renderSidebar = (item) => (
      <div>
        {/* your sidebar rendering code here */}
      </div>
    );
  
    const renderMain = (item) => (
      <div className="flex justify-center items-center h-full">
        {loading && 
          <div className="absolute">Loading PDF...</div>
        }
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(item.text)}&embedded=true`}
          style={{ width: '100%', height: '600px', visibility: loading ? 'hidden' : 'visible' }}
          frameborder="0"
          onLoad={() => setLoading(false)}
          className="w-full h-full"
        ></iframe>
      </div>
    );
  
    return (
      <ItemPage
        dbRef={dbRef}
        renderSidebar={renderSidebar}
        renderMain={renderMain}
      />
    );
  };