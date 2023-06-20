import React from 'react';

const Card = ({card}) => (
  <div className="flex flex-col items-center bg-white  overflow-hidden w-48">

    <img className="object-cover w-full h-full border-2 border-black" src={card.imageThumbnail} alt={card.name}></img>

    <h2 className="text-gray-900 font-bold text-1xl">{card.name}</h2>
  </div>
);

export default Card;