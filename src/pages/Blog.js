// pages/Blog.js
import React from 'react';
import Layout from '../layout';

const Blog = () => {
  const headline = "Blog";
  const sidebar = <p>This is the sidebar content for the Blog page.</p>;
  const main = <p>This is the main content for the Blog page.</p>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default Blog;