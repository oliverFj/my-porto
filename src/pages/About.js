import React from 'react';
import Layout from '../layout';

const About = () => {
  const headline = "About";
  const sidebar = (
    <React.Fragment>
      <div className="flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 ">
        <p> Name: Oliver Fjordside</p>
      </div>

      <div className="flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 ">
        <p> Email: oliver@fjordside.dk</p>
      </div>

      <div className="flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 ">
        <p> Phone: +45 40 59 14 78</p>
      </div>

      <img src="/Oliver_Fjordside.jpg" alt="Descriptive text" className="w-1/2 mx-auto mt-4 border-2 border-black" />
      
    </React.Fragment>
  );

  const main = 
  
  <div className="flex flex-col p-4 space-y-0">


    
<h1 className='text-2xl font-bold text-center mb-3'>This is my page! Welcome to the party zone! </h1>
  
  <p>Here I will be showcasing my work. I am a 3D artist and I have been working with 3D for 5 years now. I have a bachelor in 3D art and animation from The Animation Workshop in Viborg, Denmark. I have worked on several projects, both as a freelancer and as an employee. I have worked on projects such as the movie "The Last Kids on Earth" and the game "The Riftbreaker".</p>
  </div>;

  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default About;