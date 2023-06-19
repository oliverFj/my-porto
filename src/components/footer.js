import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full h-24 border-t-2 border-black">
      <Link to="/">
        <img src="/FjordsideLogo.png" alt="Descriptive text" className="w-52 mx-auto float-right mt-1" />
      </Link>
    </footer>
  );
}

export default Footer;