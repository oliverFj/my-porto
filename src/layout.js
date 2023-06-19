import React from 'react';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import Footer from "./components/footer";

function Layout({ headline, sidebar, main, children }) {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="w-[1000px] h-[750px] flex flex-col border-black">
        <Header>
          <h1 className="text-black text-xl text-left font-bold px-2">{headline}</h1>
        </Header>
        <div className="flex flex-row flex-grow border-l-2 border-r-2 border-black">
          <Sidebar>{sidebar}</Sidebar>
          <Content>{main}</Content>
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;