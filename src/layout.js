import React from 'react';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import Footer from "./components/footer";

// Layout component
// it takes a headline, sidebar, and main component as props and renders them and the children
// it also renders the Header and Footer components

// The hasSidebar prop is used to determine the width of the main content area
// If the hasSidebar prop is true, the main content area is 2/3 of the width of the page
// If the hasSidebar prop is false, the main content area is 100% of the width of the page

// a Layout component is used on each page of the site to render the header, sidebar, and main content area

// to call the Layout component, pass the headline, sidebar, and main content area as props
// like this: <Layout headline={headline} sidebar={sidebar} main={main}> 
// and then add the children like this: <Layout>children</Layout>

// to toggle the sidebar, pass a sidebar component as a prop
// to hide the sidebar, do not pass a sidebar component as a prop (or pass null)

function Layout({ headline, sidebar, main, children }) {
  const hasSidebar = Boolean(sidebar);
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="w-full md:w-[1000px] h-[750px] flex flex-col m-4 border-black">
        <Header>
          <h1 className="text-lg text-left font-bold">{headline}</h1>
        </Header>
        
        <div className="flex flex-col md:flex-row md:max-h-[calc(750px-150px)] flex-1 border-l-2 border-r-2 border-black">
          {hasSidebar && <Sidebar>{sidebar}</Sidebar>}
          <Content hasSidebar={hasSidebar}>{main}</Content>
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;