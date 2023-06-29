import React from 'react';

function Sidebar({ children }) {
  return (
    <aside className="w-full md:w-1/3 md:border-r-2 border-black flex flex-col">
      {children}
    </aside>
  );
}

export default Sidebar;