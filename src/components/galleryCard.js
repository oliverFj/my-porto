import React from 'react';

const Card = ({ imageThumbnail, name }) => {
  return (
    <div className="card bg-white">
      <img src={imageThumbnail} alt={name} className="card-image border-2 border-black" />
      <div className="card-name text-left font-bold">{name}</div>
    </div>
  );
};

export default Card;