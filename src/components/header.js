import React from 'react';

function Header({ children }) {
  return (
    <header className="flex items-center w-full h-12 border-2 border-black bg-orange-200">
      {children}
    </header>
  );
}

export default Header;