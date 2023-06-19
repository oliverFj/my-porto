import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Gallery({ items, totalPages }) {
    console.log("Items received by Gallery:", items);
  const { page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentPage(page);
    setCurrentItems(items.slice((page - 1) * 6, page * 6));
  }, [page, items]);

  const handlePageChange = (newPage) => {
    navigate(`/design?page=${newPage}`);
  };

  // Placeholder image URL
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="space-y-4">
      {/* Gallery */}
      <div className="grid grid-cols-3 gap-4 p-4">
  {currentItems.map((item, i) => (
    <div key={i} className="border-2 p-2 border-black">
<img className="w-full h-48 object-cover" src={item.image || placeholderImage} alt={item.alt} />
      <h3 className="mt-2 text-center font-bold">{item.title}</h3>
    </div>
  ))}
</div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link key={i} to={`/design?page=${i+1}`} className="block w-8 h-8 border text-center line-height[32px] hover:bg-gray-200" onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gallery;