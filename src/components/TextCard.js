import React from 'react';
import { Link } from 'react-router-dom';

const TextCard = ({ id, title, type }) => {
  return (
    <Link to={`/blog/${id}`} className="block bg-white border-2 border-black  hover:bg-gray-200 transition-bg duration-500 ease-in-out">
      <div key={id} className="p-4">
      <h1 className="text-black text-base text-left font-bold">{title}</h1>
        <p className="text-base text-gray-700">{type}</p>
      </div>
    </Link>
  );
};

export default TextCard;