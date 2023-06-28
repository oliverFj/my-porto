// GenericGallery.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import Layout from '../layout';
import GalleryGrid from './galleryGrid';

const GenericGallery = ({ dbRef, CardComponent, headline, tabOptions, itemsCountPerPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    const page = queryParams.get('page');

    if (tab) {
      setActiveTab(tab);
    }

    if (page) {
      setActivePage(Number(page));
    }
  }, []);

  const fetchItems = () => {
    const db = getDatabase(app);
    const itemsRef = ref(db, dbRef);

    onValue(itemsRef, (snapshot) => {
      const value = snapshot.val();

      if (value) {
        const itemsArray = Object.entries(value).map(([id, data]) => ({
          id,
          ...data,
        }));

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

  const sidebar = (
    <div className="w-full">
      <div className="menu">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            className={`w-full  hover:bg-gray-200 transition-bg duration-500 ease-in-out flex items-center h-12 !important border-b-2 border-black text-black font-bold px-2 cursor-pointer ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              navigate(`?tab=${tab}&page=${activePage}`);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout
      headline={headline}
      sidebar={sidebar}
      main={
        <GalleryGrid
          items={items}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          activeTab={activeTab}
          onPageChange={handlePageChange}
          CardComponent={CardComponent}
        />
      }
    />
  );
};

export default GenericGallery;