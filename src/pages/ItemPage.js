import React, { useEffect, useState, useRef } from 'react';
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

  const renderMain = (item) => {
    // Parse the HTML string into a DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(item.link, 'text/html');
  
    // Get the iframe from the DOM
    const iframe = doc.querySelector('iframe');
    if (iframe) {
      // Add the necessary styles to the iframe
      iframe.classList.add('absolute', 'inset-0', 'w-full', 'h-full');
  
      // Wrap the iframe in a div with the necessary styles
      const wrapper = doc.createElement('div');
      wrapper.classList.add('relative', 'w-full', 'h-[600px]');
      wrapper.appendChild(iframe.cloneNode(true)); // Clone the iframe to avoid modifying the original DOM
  
      // Serialize the wrapper back to an HTML string
      const wrapperHtml = wrapper.outerHTML;
  
      return (
        <div dangerouslySetInnerHTML={{ __html: wrapperHtml }}></div>
      );
    }
  
    // If there's no iframe in the HTML string, just return the original HTML string
    return (
      <div dangerouslySetInnerHTML={{ __html: item.link }}></div>
    );
  };

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
  const loadTimerRef = useRef(null);

  const iframeSrcRef = useRef('');

  const clearLoadTimer = () => {
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearLoadTimer();
    return clearLoadTimer; // Clear the timer when the component unmounts
  }, []);

  const renderMain = (item) => {
    iframeSrcRef.current = `https://docs.google.com/viewer?url=${encodeURIComponent(item.text)}&embedded=true&chrome=true`;

    const handleLoad = () => {
      setLoading(false);
      setError(null);
      clearLoadTimer();
    };

    const handleError = (e) => {
      setLoading(false);
      setError(`Error loading PDF: ${e.target.error}`);
      clearLoadTimer();
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
          key={`${iframeSrcRef.current}-${retryCount}`} // Change key to force re-render of iframe
          src={iframeSrcRef.current}
          style={{ width: '100%', height: '600px' }}
          frameborder="0"
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
        ></iframe>
      </div>
    );
  };

  useEffect(() => {
    if (loading) {
      // If the iframe is still loading after 5 seconds, retry loading
      loadTimerRef.current = setTimeout(() => {
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          setLoading(true);
        } else {
          setLoading(false);
          setError('Error: PDF load timeout');
        }
      }, 5000);
    }
  }, [loading, retryCount]);

  return (
    <ItemPage
      dbRef={dbRef}
      renderMain={renderMain}
    />
  );
};

// here is a link to a PDF i get from the firebase storage:
// https://firebasestorage.googleapis.com/v0/b/portfolio-fd480.appspot.com/o/pdfs%2FAI%20historie.pdf?alt=media&token=270c4110-5542-4eb9-a74f-f929d6f77f0a