import React from 'react';

const GalleryGrid = () => {
  const cards = Array(6).fill().map((_, i) => (
    <div key={i} className="flex flex-col items-center max-w-xs mx-auto bg-white border-2 border-black overflow-hidden m-4">
      <div className="px-4 py-2">
        <h2 className="text-gray-900 font-bold text-1xl">Card {i+1}</h2>
      </div>
      <img className="h-40 w-full object-cover mt-2" src={`https://source.unsplash.com/random/200x200?sig=${i}`} alt={`Card ${i+1}`}></img>
    </div>
  ));

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {cards}
      </div>
      <div className="flex justify-center my-4">
        <div className="flex rounded-md shadow-sm">
          <div>
            <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
          </div>
          <div>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryGrid;