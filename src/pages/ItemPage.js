import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust the import path as needed
import Layout from '../layout';

const ItemPage = () => {
    const { id } = useParams(); // Get the item ID from the URL
    const [item, setItem] = useState(null);

    useEffect(() => {
        const db = getDatabase(app);
        const itemRef = ref(db, `Art/${id}`);

        onValue(itemRef, (snapshot) => {
            const value = snapshot.val();
            if (value) {
                setItem({
                    id,
                    imageThumbnail: value.imageThumbnail,
                    name: value.name,
                    type: value.type,
                    link: value.link,
                    description: value.description,
                    tools: value.tools,
                    // ... Add more fields as necessary
                });
            } else {
                console.log('No data at specified database path');
            }
        });
    }, [id]);

    if (!item) {
        return <div>Loading...</div>; // Show a loading message while the data is being fetched
    }

    // Render the item details
    const sidebar = (
        <div className="w-full">
            <div className="flex  items-center h-12 text-left border-b-2 border-black text-black font-bold p-2">
                {item.type}
            </div>
    
            <div className="flex items-center h-12 text-left border-b-2 border-black text-black font-bold p-2">
                {item.tools}
            </div>
    
            <div className="flex items-center min-h-12 text-left border-b-2 border-black text-black p-2">
                {item.description}
            </div>       
        </div>
    );
    
    const main = (
        <div>
            <div dangerouslySetInnerHTML={{ __html: item.link }}></div>
        </div>
    );

    return <Layout headline={item.name} sidebar={sidebar} main={main} />;
};

export default ItemPage;