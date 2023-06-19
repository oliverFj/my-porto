// pages/Upload.js
import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import UploadForm from '../components/uploadForm';

const Upload = () => {
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
    {name: 'type', type: 'text'}
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

  return (
    <Layout headline="Upload" sidebar={sidebar} main={main} />
  );
};

export default Upload;