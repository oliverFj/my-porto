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
        ? 'bg-gray-200  text-black px-4 border-l-2 border-black'
        : '  text-black hover:bg-gray-300 px-4 border-l-2 border-black px-4';

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
          className="bg-white text-black  hover:bg-gray-300 border-l-2 border-black px-4 "
          onClick={() => handlePageChange(activePage - 1)}
        >

          &#x21FD;
        </button>
      );
    }
    return null;
  };

  const renderNextButton = () => {
    if (activePage < totalPages) {
      return (
        <button 
          className="text-black hover:bg-gray-300 border-l-2 border-black px-4  "
          onClick={() => handlePageChange(activePage + 1)}
        >




          &#x21FE;
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center">
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

          //junior: what other unicode symbols can we use here?
          //senior: https://www.w3schools.com/charsets/ref_utf_arrows.asp