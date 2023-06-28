import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, imageThumbnail, name }) => { 
  return (
    <Link to={`/Art/${id}`}>
      <div className="card bg-white">
        <img src={imageThumbnail} alt={name} className="card-image border-2 border-black" />
        <div className="card-name text-left font-bold">{name}</div>
      </div>
    </Link>
  );
};

export default Card;