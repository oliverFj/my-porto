import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ items }) {
  return (
    <div className="flex flex-col space-y-0">
      {items.map((item, index) => (
        <Link key={index} to={item.link} className="block hover:bg-gray-200">
          <div className="flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 cursor-pointer">
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Menu;