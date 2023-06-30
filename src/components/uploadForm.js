import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, get } from "firebase/database"; // Import get
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';

function UploadForm({ fields, databasePath }) {
  const initialFieldValues = fields.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {});
  const [values, setValues] = useState(initialFieldValues);
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pdfKey, setPdfKey] = useState(Math.random().toString(36));

  const ART_TYPES = ["3d Character", "Product design", "Art"];
  const WRITING_TYPES = ["Blog", "Poems", "Essays"];

  useEffect(() => {
    setValues(fields.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {}));
  }, [fields]);

  const handleChange = (e) => {
    if (e.target.name === 'imageThumbnail') {
      setImage(e.target.files[0]);
    } else if (e.target.name === 'text') {
      setPdf(e.target.files[0]);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  };

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can add code here to handle the progress of the upload if you like
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const dbRef = ref(db, databasePath); // Get a reference to the database path
  
    // Get the current number of items in the database
    // This will be used to determine the indexNumber of the new item
    let indexNumber = 0;
    const snapshot = await get(dbRef); // Use get instead of once
    indexNumber = snapshot.size; // Use size instead of numChildren

    const imageUrl = await uploadFile(image, 'images');
    const pdfUrl = await uploadFile(pdf, 'pdfs');

    const filteredValues = Object.keys(values).reduce((obj, key) => {
      if (values[key] !== '') {
        obj[key] = values[key];
      }
      return obj;
    }, {});

    if (imageUrl) {
      filteredValues.imageThumbnail = imageUrl;
    }

    if (pdfUrl) {
      filteredValues.text = pdfUrl;
    }

    if (databasePath.includes('Art')) {
      filteredValues.type = values.type || ART_TYPES[0];
    } else {
      filteredValues.type = values.type || WRITING_TYPES[0];
    }

    // Add the indexNumber to the new item
    // This will be used to sort the items in the database
    filteredValues.indexNumber = indexNumber + 1;

    push(dbRef, filteredValues)
    .then(() => {
        setImage(null);
        setPdf(null);
        setValues(initialFieldValues);
        setPdfKey(Math.random().toString(36));
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={field.name} className="w-14 text-left mr-4">{field.name}</label>
          {field.name === 'imageThumbnail' ? (
            <input id={field.name} name={field.name} type="file" onChange={handleChange} className="w-3/4 border rounded px-2" />
          ) : field.name === 'type' ? (
            <select id={field.name} name={field.name} value={values[field.name]} onChange={handleChange} className="w-3/4 border rounded px-2">
              {(databasePath === 'Art' ? ART_TYPES : WRITING_TYPES).map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          ) : field.name === 'text' ? (
            <input id={field.name} name={field.name} type="file" accept="application/pdf" onChange={handleChange} className="w-3/4 border rounded px-2" key={pdfKey} />
          ) : (
            <input id={field.name} name={field.name} type={field.type} value={values[field.name]} onChange={handleChange} className="w-3/4 border rounded px-2" />
          )}
        </div>
      ))}
      <button type="submit" className="self-end mt-4 px-4 py-2 border-2 border-black text-black">Submit</button>
    </form>
  );
}

export default UploadForm;

/*
This code defines a React component named UploadForm that provides a form for users to upload files
and other data to a Firebase database and storage. Here are the three main points that summarize what this code does:

Form State Management: The UploadForm component uses React's useState and useEffect hooks to manage 
the state of the form. The useState hook is used to create state variables for the form fields (values),
the image file to be uploaded (image), the PDF file to be uploaded (pdf), and a key for the PDF file (pdfKey). 
The useEffect hook is used to reset the form fields whenever the fields prop changes. 
The handleChange function is used to update the state variables when the user interacts with the form.

File Upload: The uploadFile function is used to upload a file to Firebase storage. It creates a reference to a location in Firebase
 storage, starts a resumable upload, and returns a promise that resolves with the download URL of the uploaded file. 
 This function is used in the handleSubmit function to upload the image and PDF files when the form is submitted.

Form Submission: The handleSubmit function is triggered when the form is submitted. It prevents the default form submission behavior,
gets a reference to a location in the Firebase database, calculates the index number for the new item, uploads the image and PDF
files, filters the form values, sets the type of the item based on the databasePath, adds the index number to the new item, 
and pushes the new item to the Firebase database. If the upload is successful, it resets the form and the state variables; if not, it logs the error.

The code needs the following from external sources:

- React, useState, and useEffect from the react library for creating the React component and managing state.

- Various functions from the firebase/database and firebase/storage libraries for interacting with Firebase.

- The app object from the ../firebase module, which represents the Firebase app.

- The fields and databasePath props, which are passed to the UploadForm component when it is used. The fields 
  prop is an array of objects that define the fields of the form, and the databasePath prop is a string that 
  specifies the path in the Firebase database where the new item should be stored.

*/