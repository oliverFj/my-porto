import React from 'react';

function Content({ children, hasSidebar }) {
  const widthClass = hasSidebar ? 'w-full md:w-2/3' : 'w-full';
  return (
    <main className={widthClass}>
      {children}
    </main>
  );
}

export default Content;