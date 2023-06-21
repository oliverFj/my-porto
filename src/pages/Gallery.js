/*

Imports: Koden begynder med at importere nødvendige biblioteker og komponenter. 
Dette inkluderer React (med useState og useEffect hooks), routing hooks fra 
'react-router-dom' (useNavigate og useLocation), Layout komponenten, Firebase 
database funktioner, Firebase app konfigurationen, og til sidst GalleryGrid komponenten.

Komponentdefinition: Herefter defineres Gallery komponenten. Dette er hovedkomponenten,
der vil indeholde alle de andre komponenter og funktionaliteter.

State definition: Der defineres en række state variabler ved hjælp af React's
useState hook. Disse variabler inkluderer 'items' (data hentet fra databasen),
'activePage' (den aktive side i galleriet), 'totalItemsCount' (total antal elementer),
'activeTab' (den aktive fane), og en konstant 'itemsCountPerPage' (antal elementer pr. side).

URL parametre: Ved hjælp af 'useLocation' hook fra 'react-router-dom', hentes URL parametre.
I en 'useEffect' hook bruges disse parametre til at sætte 'activeTab' og 'activePage' states,
når komponenten første gang mounts.

Data hentning: Der er en funktion kaldet 'fetchItems', der bruges til at hente data fra
Firebase databasen. Data hentes fra 'Art' noden, og konverteres til et array af objekter,
som derefter filtreres baseret på den aktive fane.

Data hentning ved tab skift: En anden 'useEffect' hook bruges til at kalde 'fetchItems'
funktionen, hver gang 'activeTab' skifter. Dette sikrer, at de rigtige data hentes
fra databasen, afhængig af den valgte fane.

Side skift håndtering: Der er en funktion kaldet 'handlePageChange', der bruges til at håndtere
side skift i galleriet. Denne funktion opdaterer 'activePage' state og navigerer til
den nye side med opdaterede URL parametre.

Galleri Grid rendering: 'renderGalleryGrid' er en funktion, der returnerer 'GalleryGrid'
komponenten med de nødvendige props.

Sidebar: Der er en sidebar komponent, der indeholder knapper for hver fane. Når en knap klikkes,
opdateres 'activeTab' state, og brugeren navigeres til den aktive side med den valgte fane som URL parameter.

Layout rendering: Til sidst returneres 'Layout' komponenten med 'headline', 'sidebar', og det renderede
galleri grid. Denne komponent er den faktiske UI, som brugeren vil interagere med.

*/  


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Layout from '../layout';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import GalleryGrid from '../components/galleryGrid';

const Gallery = () => {
  // Hook for navigating between pages
  const navigate = useNavigate();
  
  // Headline for the layout
  const headline = "Gallery";
  
  // Options for different tabs in the gallery
  const tabOptions = ['All', '3d Character', 'Product design', 'Art'];
  
  // State hooks for different components and data on the page
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  
  // Number of items to be shown per page
  const itemsCountPerPage = 6;

  // Hook for getting the current location/page URL
  const location = useLocation();

  // Effect hook for fetching and setting tab and page from URL parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    const page = queryParams.get('page');

    if (tab) {
      setActiveTab(tab);
    }

    if (page) {
      setActivePage(Number(page));
    }
  }, []);

  // Function to fetch items from firebase
  const fetchItems = () => {
    // Initialize firebase database
    const db = getDatabase(app);
    
    // Reference to 'Art' node in the database
    const itemsRef = ref(db, 'Art');
    
    // Listen for changes in the data
    onValue(itemsRef, (snapshot) => {
      const value = snapshot.val();
      
      // Check if value exists
      if (value) {
        // Transform the value object to an array of items
        const itemsArray = Object.entries(value).map(([id, data]) => ({
          id,
          imageThumbnail: data.imageThumbnail,
          name: data.name,
          type: data.type, // Assuming the type property exists in the database
        }));
  
        // Filter items based on the selected tab
        const filteredItems =
          activeTab === 'All'
            ? itemsArray
            : itemsArray.filter((item) => item.type === activeTab);
  
        // Update state with the fetched and filtered items
        setItems(filteredItems);
        setTotalItemsCount(filteredItems.length);
      } else {
        console.log('No data at specified database path');
      }
    });
  };

  // Effect hook to fetch items whenever the active tab changes
  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    
    // Navigate to the new page with updated parameters
    navigate(`?tab=${activeTab}&page=${pageNumber}`);
  };

  // Function to render the gallery grid
  const renderGalleryGrid = () => {
    return (
      <GalleryGrid
        items={items}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        activeTab={activeTab}
        onPageChange={handlePageChange}
      />
    );
  };

  // Sidebar component with buttons for different tabs
  const sidebar = (
    <div className="w-full">
      <div className="menu">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            className={`w-full hover:bg-gray-200 flex items-center h-12 !important border-b-2 border-black text-black font-bold px-2 cursor-pointer ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              navigate(`?tab=${tab}&page=${activePage}`);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );

  // Render the layout with the sidebar and main gallery grid
  return (
    <Layout headline={headline} sidebar={sidebar} main={renderGalleryGrid()} />
  );
};

export default Gallery;