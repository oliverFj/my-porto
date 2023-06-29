import React from 'react';

function Sidebar({ children }) {
  return (
    <aside className="w-full md:w-1/3 md:max-h-[calc(750px-150px)] md:border-r-2 border-black flex flex-col box-border">
      {children}
    </aside>
  );
}

export default Sidebar;