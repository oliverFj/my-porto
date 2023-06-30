import React from 'react';
import { Link } from 'react-router-dom';

const TextCard = ({ id, Intro, title, type }) => {
  return (
    <Link to={`/blog/${id}`} className="block bg-white border-2 border-black  hover:bg-gray-200 transition-bg duration-500 ease-in-out">
      <div key={id} className="p-4">
        <h1 className="text-black text-base text-left font-bold">{title}</h1>
        <p className="text-justify text-gray-700">{Intro}</p> 


      </div>
    </Link>
  );
};

export default TextCard;

        // Junior: How can i get the text nice and like squared like "justify" in word? Tell me:
        // Senior: You can use the "text-justify" class in Tailwind CSS. It will make the text look like it does in Word.
