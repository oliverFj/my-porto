import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ activePage, itemsCountPerPage, totalItemsCount, onChange }) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== activePage) {
      onChange(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === activePage;
      const buttonClasses = isActive
        ? 'text-black px-4 py-2 border-2 border-black'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 ';

      pageButtons.push(
        <button
          key={i}
          className={buttonClasses}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  const renderPrevButton = () => {
    if (activePage > 1) {
      return (
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2"
          onClick={() => handlePageChange(activePage - 1)}
        >
          Previous
        </button>
      );
    }
    return null;
  };

  const renderNextButton = () => {
    if (activePage < totalPages) {
      return (
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 "
          onClick={() => handlePageChange(activePage + 1)}
        >
          Next
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center mt-4">
      {renderPrevButton()}
      {renderPageButtons()}
      {renderNextButton()}
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;