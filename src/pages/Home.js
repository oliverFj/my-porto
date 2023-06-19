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
                { label: 'Upload', link: '/upload' },
                // Add more menu items as needed
            ]}
        />
    );
    const main =

        <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold pt-4 ">Welcome to my portfolio and my blog</h2>
            <p className="text-lg ">I am a writer, designer, developer and artist. Here you can find examples of my work.</p>


            <img src="/Profilbillede.jpg" alt="Descriptive text" className="w-1/2 mx-auto rounded-full border-2 border-black" />
        </div>;

    return (
        <Layout headline={headline} sidebar={sidebar} main={main} />
    );
};

export default Home;