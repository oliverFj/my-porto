import React from 'react';

function Content({ children, hasSidebar }) {
  const widthClass = hasSidebar ? 'w-full md:w-2/3' : 'w-full';
  const scrollClass = hasSidebar ? 'md:overflow-y-auto md:max-h-[calc(750px-150px)]' : '';

  return (
    <main className={`${widthClass} ${scrollClass}`}>
      <div className="container mx-auto">
        {children}
      </div>
    </main>
  );
}

export default Content;