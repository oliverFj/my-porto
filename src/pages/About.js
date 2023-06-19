// pages/About.js
import React from 'react';
import Layout from '../layout';

const About = () => {
  const headline = "About";
  const sidebar = <p>This is the sidebar content for the about page.</p>;
  const main = <p>This is the main content for the about page.</p>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default About;