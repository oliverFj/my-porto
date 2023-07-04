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



      <h1 className='text-2xl font-bold text-center mb-3'>Oliver Jack Jones Fjordside</h1>



      <p className='text-justify'>On this page you can see some of my work and read some of my thoughts. I have a gallery with examples of 3D art,
        design, and whatever I have had in a format and was in a state of somewhat completion. <br />
        <br />
        I am very good at starting projects.  <br />
        Therefore I know a lot of stuff, <br />
        and can make a lot of different things.<br />
        <br />
        I am currently studying for a masters degree in digital design and interactive technology at the danish IT University,
        and I have a bacelors degree in digital concept development from the Zealand Academy of Technologies and Business.
        <br />
        I have worked with graphics and design for over 10 years, and I have an extensive understanding of modern technology.
        This expertise has led me to lecture and teach at an academic level on numerous occasions.
        <br />
        <br />
        My current focus is on applied use of AI. Besides that I have a lot of experience designing and making prototypes.
        I have worked with 3D printing, laser cutting, and CNC routing. I have also worked with electronics and programming, and I have my own workshop.
        <br />
        I am experienced in the use of Adobe Creative Cloud, Blender, Fusion 360, Unity engine and a whole lot of other software.
        

      </p>
    </div>;




  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default About;