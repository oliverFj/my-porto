import React from 'react';

function Content({ children }) {
  return (
    <main className="w-2/3">
      {children}
    </main>
  );
}

export default Content;