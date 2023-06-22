// components/TextCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TextCard = ({ id, title, type }) => {
  return (
    <Link to={`/blog/${id}`}>
      <div key={id} className="text-card">
        <h2>{title}</h2>
        <p>{type}</p>
      </div>
    </Link>
  );
};

export default TextCard;