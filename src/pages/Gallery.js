import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Layout from '../layout';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import GalleryGrid from '../components/galleryGrid';

const Gallery = () => {
  const navigate = useNavigate();
  const headline = "Gallery";
  const tabOptions = ['All', '3d Character', 'Product design', 'Art'];
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const itemsCountPerPage = 6;

  const fetchItems = () => {
    const db = getDatabase(app);
    const itemsRef = ref(db, 'Art');
    onValue(itemsRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const itemsArray = Object.entries(value).map(([id, data]) => ({
          id,
          imageThumbnail: data.imageThumbnail,
          name: data.name,
          type: data.type, // Assuming the type property exists in the database
        }));

        // Filter items based on the selected tab
        const filteredItems =
          activeTab === 'All'
            ? itemsArray
            : itemsArray.filter((item) => item.type === activeTab);

        setItems(filteredItems);
        setTotalItemsCount(filteredItems.length);
      } else {
        console.log('No data at specified database path');
      }
    });
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    navigate(`?tab=${activeTab}&page=${pageNumber}`);
  };

  const renderGalleryGrid = () => {
    return (
      <GalleryGrid
        items={items}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        activeTab={activeTab}
        onPageChange={handlePageChange}
      />
    );
  };

  const sidebar = (
    <div className="w-full">
      <div className="menu">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            className={`w-full hover:bg-gray-200 flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 cursor-pointer ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout headline={headline} sidebar={sidebar} main={renderGalleryGrid()} />
  );
};

export default Gallery;