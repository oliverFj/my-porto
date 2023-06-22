// GenericItemPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import Layout from '../layout';

const GenericItemPage = ({ dbRef, renderSidebar, renderMain }) => {
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

  return (
    <Layout
      headline={item.name || item.title}
      sidebar={renderSidebar(item)}
      main={renderMain(item)}
    />
  );
};

export default GenericItemPage;