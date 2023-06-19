import React, { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';

function UploadForm({ fields, databasePath }) {
  const initialFieldValues = fields.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {});
  const [values, setValues] = useState(initialFieldValues);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'imageThumbnail') {
      setImage(e.target.files[0]);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageReference, image);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
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
    const imageUrl = await uploadImage();
    const filteredValues = Object.keys(values).reduce((obj, key) => {
      if (values[key] !== '') {
        obj[key] = values[key];
      }
      return obj;
    }, {});

    if (imageUrl) {
      filteredValues.imageThumbnail = imageUrl;
    }

    push(ref(db, databasePath), filteredValues);
    setImage(null);
    setValues(initialFieldValues);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-4">
      {fields.map((field, index) => (
        <div key={index} className="flex items-center h-12">
          <label htmlFor={field.name} className="w-14 text-right mr-4">{field.name}</label>
          {field.name === 'imageThumbnail' ? (
            <input id={field.name} name={field.name} type="file" onChange={handleChange} className="w-3/4 border rounded px-2" />
          ) : (
            <input id={field.name} name={field.name} type={field.type} value={values[field.name]} onChange={handleChange} className="w-3/4 border rounded px-2" />
          )}
        </div>
      ))}
      <button type="submit" className="self-end mt-4 px-4 py-2 border-2 border-black text-black ">Submit</button>
    </form>
  );
}

export default UploadForm;