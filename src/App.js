// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import ItemPage from './pages/ItemPage';
import BlogItemPage from './pages/BlogItemPage';


import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route path="/upload" element={<Upload />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/blog/:id" element={<BlogItemPage />} />

        <Route path="*" element={<NotFound />} />
        // add more routes as needed
      </Routes>
    </Router>
  );
};

export default App;