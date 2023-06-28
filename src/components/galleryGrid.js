// GalleryGrid.js


import React from 'react';
import Pagination from './pagination';

const GalleryGrid = ({
  items,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  activeTab,
  onPageChange,
  CardComponent,
}) => {
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;

 const gridItems = items
    .slice(startIndex, endIndex)
    .map((item) => <CardComponent key={item.id} {...item} />);

  const gridRows = [];
  for (let i = 0; i < gridItems.length; i += 3) {
    gridRows.push(
      <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {gridItems.slice(i, i + 3)}
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-12 border-b-2 border-black">
        <h1 className="text-black text-xl text-left font-bold px-2 ">{activeTab}</h1>
        <div className="flex justify-between h-12">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <div className="gallery-grid">{gridRows}</div>
    </div>
  );
};

export default GalleryGrid;