// pages/Home.js
import React from 'react';
import Layout from '../layout';

const Home = () => {
  const headline = "Home";
  const sidebar = <p>This is the sidebar content for the home page.</p>;
  const main = <p>This is the main content for the home page.</p>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default Home;