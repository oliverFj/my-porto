import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import Layout from '../layout';



const ItemPage = ({ dbRef, renderSidebar = () => null, renderMain }) => {
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
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const renderMain = (item) => {
    const iframeSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(item.text)}&embedded=true&chrome=true`;

    const handleLoad = () => {
      setLoading(false);
      setRetryCount(0); // Reset retry count on successful load
    };

    const handleError = (e) => {
      setLoading(false);
      setError(`Error loading PDF: ${e.target.error}`);
      if (retryCount < 3) { // Limit the number of retries to prevent infinite loop
        setTimeout(() => {
          setRetryCount(retryCount + 1); // Increment retry count
          setLoading(true); // Trigger a re-render to attempt to load the PDF again
        }, 3000); // Wait 3 seconds before retrying
      }
    };

    return (
      <div className="flex justify-center items-center h-full relative">
        {loading && 
          <div className="absolute">Loading PDF...</div>
        }
        {error && 
          <div className="absolute">{error}</div>
        }
        <iframe
          key={`${iframeSrc}-${retryCount}`} // Change key to force re-render of iframe
          src={iframeSrc}
          style={{ width: '100%', height: '600px' }}
          frameborder="0"
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
        ></iframe>
      </div>
    );
  };

  return (
    <ItemPage
      dbRef={dbRef}
      renderMain={renderMain}
    />
  );
};


// here is a link to a PDF i get from the firebase storage:
// https://firebasestorage.googleapis.com/v0/b/portfolio-fd480.appspot.com/o/pdfs%2FAI%20historie.pdf?alt=media&token=270c4110-5542-4eb9-a74f-f929d6f77f0a