import React from 'react';
import Card from './galleryCard';
import Pagination from './pagination';

const GalleryGrid = ({
  items,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  activeTab,
  onPageChange,
}) => {
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const gridItems = items
  .slice(startIndex, endIndex)
  .map(({ id, imageThumbnail, name }) => (
    <Card key={id} imageThumbnail={imageThumbnail} name={name} />
  ));

// Filter gridItems based on the selected tab
const filteredGridItems =
  activeTab === 'All'
    ? gridItems
    : gridItems.filter((item) => item.props.type === activeTab);

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
      <div className="gallery-grid">{gridRows}</div>
      <div className="flex justify-center mt-4">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GalleryGrid;