import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import { ArtItemPage, BlogItemPage } from './pages/ItemPage';
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
        <Route path="/art/:id" element={<ArtItemPage />} />
        <Route path="/blog/:id" element={<BlogItemPage />} />
        <Route path="*" element={<NotFound />} />
        // add more routes as needed
      </Routes>
    </Router>
  );
};

export default App;

//trying again to push to github and see if i am on the master branch or whatever