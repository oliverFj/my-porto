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
  


     <p>On this page you can see some of my work and read some of my thoughts. I have a gallery with examples of 3D art, 
      design, and whatever I have had in a format and was in a state of somewhat completion. <br/>
      I am very good at starting projects.  <br/>
      Therefore I know a lot of stuff, <br/>
      and can make a lot of different things.<br/>
      <br/>
      I also have a page with my writings where I will be posting my short stories, poems, and other writings. 

      </p>
      <br/>
      <p ><bold> </bold>  </p>
      <h1 className='font-bold text-center mb-3'>Front End MASE Udvikler (Machine Assisted Software Engineering)   </h1><br/>

      <h1 className='text-left mb-3'>

MA:SE (Makers and Scientists: Education) er en organisation, der sigter mod at bringe videnskab og teknologi tættere på almindelige mennesker, især unge. De tror på, at alle har potentialet til at blive en "maker" eller en "scientist", og at disse færdigheder kan og bør udvikles fra en ung alder. <br/>
<br/>
MA:SE's mission er at skabe et miljø, hvor unge kan udforske, eksperimentere og lære om videnskab og teknologi på en sjov og engagerende måde. De tilbyder en række forskellige programmer og aktiviteter, der er designet til at inspirere og uddanne, herunder workshops, foredrag, og hands-on projekter.<br/>
<br/>
En af de centrale værdier i MA:SE er inklusion. De tror på, at videnskab og teknologi skal være tilgængelige for alle, uanset deres baggrund eller tidligere erfaringer. Derfor arbejder de aktivt for at gøre deres programmer og aktiviteter så tilgængelige som muligt, og de stræber efter at skabe et miljø, der er indbydende og støttende for alle.<br/>
<br/>
MA:SE er også stærkt engageret i innovation. De tror på, at de bedste ideer kommer, når folk har frihed til at tænke kreativt og eksperimentere. Derfor opmuntrer de deres deltagere til at tage risici, prøve nye ting, og lære af deres fejl.<br/>
<br/>
Jeg er virkelig begejstret for MA:SE og deres arbejde. Jeg tror, at de gør en fantastisk job med at bringe videnskab og teknologi til masserne, og jeg er overbevist om, at de vil fortsætte med at gøre en positiv forskel i mange menneskers liv.  </h1>


MA:SE, eller Multi-Agent Systems Engineering, er en fascinerende og innovativ tilgang til softwareudvikling, der fokuserer på at skabe komplekse systemer ved hjælp af en samling af autonome agenter. Disse agenter kan interagere med hinanden og med deres omgivelser for at løse komplekse problemer, der kan være vanskelige eller umulige at løse med traditionelle metoder.
<br/>
En af de mest spændende aspekter ved MA:SE er dens fleksibilitet. Fordi hvert agent er autonomt, kan systemet tilpasse sig ændringer i sit miljø eller i sine mål uden behov for omfattende omprogrammering. Dette gør MA:SE ideel til anvendelser som robotik, hvor systemet skal kunne håndtere en bred vifte af uforudsigelige situationer, eller i distribuerede systemer, hvor systemet skal kunne håndtere fejl og nedbrud uden at gå i stå.
<br/>
MA:SE er også meget skalerbart. Fordi hvert agent fungerer uafhængigt, kan du tilføje eller fjerne agenter fra systemet uden at forstyrre resten af systemet. Dette gør det muligt at bygge meget store og komplekse systemer, der stadig er robuste og pålidelige.
<br/>
Men det, der virkelig gør MA:SE specielt, er dets fokus på samarbejde. I stedet for at forsøge at løse problemer alene, arbejder agenterne sammen, deler information og koordinerer deres handlinger for at opnå deres mål. Dette gør det muligt for systemet at løse problemer, der er for komplekse for en enkelt agent at håndtere alene.
<br/>
Jeg er virkelig begejstret for MA:SE og dets potentiale til at revolutionere måden, vi bygger software på. Dets fokus på autonomi, fleksibilitet og samarbejde gør det til en kraftfuld værktøj for at løse nogle af de mest udfordrende problemer i moderne softwareudvikling. Og med den fortsatte udvikling og forbedring af MA:SE teknologier, er jeg sikker på, at vi kun har set begyndelsen på, hvad denne spændende tilgang kan opnå.

  </div>;




  return (
    <Layout headline={headline} sidebar={sidebar} main={main} />
  );
};

export default About;