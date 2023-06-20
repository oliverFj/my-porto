import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, orderByKey, startAt, limitToFirst } from "firebase/database";
import { app } from '../firebase'; // <- Import your Firebase app from where it's configured
import Card from './galleryCard'; // <- Import the Card component

const GalleryGrid = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastKey, setLastKey] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [pageKeys, setPageKeys] = useState([]); // Add a new state variable to keep track of the starting keys of each page

  const itemsPerPage = 6;

  const fetchItems = (startKey) => {
    const db = getDatabase(app);
    const artRef = ref(db, 'Art'); // <- Make sure this path matches your Firebase database structure
    let itemsQuery;

    if (startKey) {
      itemsQuery = query(artRef, orderByKey(), startAt(startKey), limitToFirst(itemsPerPage + 1));
    } else {
      itemsQuery = query(artRef, orderByKey(), limitToFirst(itemsPerPage));
    }

    onValue(itemsQuery, (snapshot) => {
      const data = snapshot.val();
      const items = [];
      for (let id in data) {
        items.push({ id, ...data[id] });
      }

      if (startKey) {
        items.shift(); // remove the first item, which is duplicate from previous page
        setPageKeys([...pageKeys, items[0].id]); // Save the key of the first item only when fetching the next page
      }
      setCards(items);
      if (items.length > 0) {
        setLastKey(items[items.length - 1].id); // save the key of the last item
      }

      // if we received less items than requested, it means there are no more items to fetch
      if (items.length < itemsPerPage) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    });
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchItems(lastKey);
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Fetch the previous page using the key of the first item from the current page
      // Note that we are popping the last element off pageKeys to keep it in sync with the current page
      const newPageKeys = [...pageKeys];
      newPageKeys.pop();
      setPageKeys(newPageKeys);
      fetchItems(newPageKeys[newPageKeys.length - 1]);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {cards.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <div className="flex rounded-md shadow-sm">
          <div>
            <button onClick={prevPage} className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
          </div>
          <div>
            {hasMore && (
              <button onClick={nextPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
);
};

export default GalleryGrid;