/**
 * Upload component
 * This is a page component that includes the UploadForm for different types of uploads.
 * 
 * You need to change:
 * - `ART_FIELDS` and `WRITING_FIELDS`: These arrays define the fields for two different types of uploads. Modify these arrays to suit the fields required for your use case. 
 * - `menuItems`: This array defines the different types of uploads available. Update the 'label', 'path', and 'fields' for each item to match your use case.
 * - `Layout` import: You need to import your layout component from where it is defined in your project.
 * - `UploadForm` import: You need to import the UploadForm component from where it is defined in your project.
 */
// pages/Upload.js

//Skriv nogle pædagogiske kommentarer til denne kode:

import React, { useState } from 'react';
import Layout from '../layout'; 
import UploadForm from '../components/uploadForm'; 

const Upload = () => {
  const PASSWORD = "123ThePassword"; // Set your password here

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };


  const ART_FIELDS = [
    {name: 'description', type: 'text'},
    {name: 'imageThumbnail', type: 'text'},
    {name: 'link', type: 'text'},
    {name: 'name', type: 'text'},
    {name: 'tools', type: 'text'},
    {name: 'type', type: 'text'}
  ];

  const WRITING_FIELDS = [
    {name: 'text', type: 'text'},
    {name: 'title', type: 'text'},
    {name: 'type', type: 'text'},
    {name: 'Intro', type: 'text'}, // Add this line
  ];

  const menuItems = [
    {label: 'Art', path: 'Art', fields: ART_FIELDS},
    {label: 'Writings', path: 'Writings', fields: WRITING_FIELDS}
  ];

  const [databasePath, setDatabasePath] = useState(menuItems[0].path);
  const [fields, setFields] = useState(menuItems[0].fields);

  const handleMenuClick = (path, fields) => {
    setDatabasePath(path);
    setFields(fields);
  };

  const sidebar = (
    <div className="flex flex-col space-y-2">
      {menuItems.map((item, index) => (
        <button key={index} onClick={() => handleMenuClick(item.path, item.fields)} className="block hover:bg-gray-200" style={{ margin: 0 }}>
          <div className="flex items-center h-12 text-center border-b-2 border-black text-black font-bold px-2 cursor-pointer">
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );

  const main = <UploadForm fields={fields} databasePath={databasePath} />;

  if (!authenticated) {
    return (
      <div>
        <form onSubmit={handlePasswordSubmit}>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <Layout headline="Upload" sidebar={sidebar} main={main} />
    );
  }
};

export default Upload;