// pages/Home.js
import React from 'react';
import Layout from '../layout';
import Menu from '../components/menu'; // Adjust the path as needed

const Home = () => {
  const headline = "Oliver Fjordside";
  const sidebar = (
    <Menu
      items={[
        { label: 'Design and art', link: '/gallery' },
        { label: 'Blog and writings', link: '/blog' },
        { label: 'About Me', link: '/about' },
        // Add more menu items as needed
      ]}
    />
  );
  const main = <p>This is the main content for the home page.</p>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default Home;