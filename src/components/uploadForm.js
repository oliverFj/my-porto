/**
Komponenten UploadForm

Dette er en formular-komponent, der håndterer upload af data til en Firebase-database og -lagring.
Denne komponent er designet til at blive brugt i en React-app, der er konfigureret med Firebase.

@param {Object} props
@param {Array} props.fields - Et array af objekter, der repræsenterer felterne i formularen. Hvert objekt skal have et 'name' og 'type'.
@param {String} props.databasePath - En streng, der repræsenterer stien i Firebase-databasen, hvor dataene vil blive gemt.

Du skal ændre:

fields: Opdater dette for at afspejle de felter, din formular skal indeholde. Hvert feltsobjekt skal have et 'name' og 'type'.
databasePath: Dette skal pege på placeringen i din Firebase-database, hvor du vil gemme formulardataene.

Import af app: Du skal importere konfigurationen for din Firebase-app fra det sted, hvor den er defineret i dit projekt.
Firebase-konfigurationen for både database og lagring skal være korrekt opsat i din Firebase-konsol.


------------------
Denne kode definerer en React-komponent kaldet UploadForm, der håndterer upload af data til en Firebase-database og -lagring.

Komponenten modtager to props: fields og databasePath. fields er et array af objekter, der repræsenterer felterne i formularen, og databasePath er stien i Firebase-databasen, hvor dataene vil blive gemt.

fields og databasePath skal tilpasses i forhold til de specifikke felter og sti i den aktuelle Firebase-konfiguration.

Firebase-appen skal importeres fra det relevante sted i projektet og tildeles variablen app. Dette sikrer, at den korrekte Firebase-konfiguration bruges.

Komponenten bruger React Hooks som useState og useEffect til at håndtere formularværdier og livscyklushændelser.

handleChange-funktionen opdaterer værdierne baseret på brugerens input. Hvis input er en billedfil, gemmes filen separat i image-tilstanden.

uploadImage-funktionen håndterer upload af billedet til Firebase Storage og returnerer en Promise, der resulterer i billedets download-URL.

handleSubmit-funktionen håndterer indsendelsen af formularen. Den uploader først billedet ved hjælp af uploadImage-funktionen og opdaterer derefter formularværdierne og den filtrerede værdi, der skal gemmes i Firebase-databasen. Til sidst nulstilles formularværdierne.

Komponenten genererer HTML-formularelementer baseret på fields-prop. Det støtter inputfelter, filindtastning og dropdown-menuer afhængigt af felterne i fields.

Når formularen indsendes, kaldes handleSubmit-funktionen, og dataene sendes til Firebase-databasen ved hjælp af push-metoden fra Firebase Realtime Database SDK.
------------------

De to vigtigste ting ved denne fil er:

Dataupload til Firebase: Filen indeholder implementeringen af en formularkomponent, 
der håndterer upload af data til en Firebase-database og -lagring. 
Dette er en afgørende funktionalitet for applikationer, der ønsker at gemme 
brugerindtastede data i en Firebase-database og håndtere upload af billeder 
eller andre filer til Firebase Storage.

Med andre ord: upload af data til Firebase-databasen og -lagringen.

Firebase-konfiguration: Filen kræver, at Firebase-appens konfiguration importeres
fra et andet sted i projektet og tildeles variablen app. Dette sikrer, at den 
korrekte Firebase-konfiguration bruges til at oprette forbindelse til Firebase-databasen
og -lagringen. En korrekt konfiguration af Firebase er afgørende for at kunne foretage
dataupload og -lagring korrekt.

Med andre ord: Firebase-konfigurationen skal være korrekt opsat i din Firebase-konsol.

*/

import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDatabase, ref, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase'; // <- Import your Firebase app from where it's configured

function UploadForm({ fields, databasePath }) {
  const initialFieldValues = fields.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {});
  const [values, setValues] = useState(initialFieldValues);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const quillRef = useRef(null);

  const ART_TYPES = ["3d Character", "Product design", "Art"];
  const WRITING_TYPES = ["Blog", "Poems", "Essays"];

  useEffect(() => {
    setValues(fields.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {}));
  }, [fields]);

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

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleQuillResize = () => {
    const editor = quillRef.current.getEditor();
    const editorHeight = editor.root.offsetHeight;
    const container = quillRef.current.container.parentNode;
    container.style.height = `${editorHeight}px`;
  };

  const uploadImage = async () => {
    if (!image) return null;
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageReference, image);

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

    if (databasePath.includes('Art')) {
      filteredValues.type = values.type || ART_TYPES[0];
    } else {
      filteredValues.type = values.type || WRITING_TYPES[0];
    }

    filteredValues.text = text; // Add the rich text content to the values

    push(ref(db, databasePath), filteredValues)
      .then(() => {
        setImage(null);
        setValues(initialFieldValues);
        setText('');
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col"> {/* Wrap each field in a flex column */}
          <label htmlFor={field.name} className="w-14 text-right mr-4">{field.name}</label>
          {field.name === 'imageThumbnail' ? (
            <input id={field.name} name={field.name} type="file" onChange={handleChange} className="w-3/4 border rounded px-2" />
          ) : field.name === 'type' ? (
            <select id={field.name} name={field.name} value={values[field.name]} onChange={handleChange} className="w-3/4 border rounded px-2">
              {(databasePath === 'Art' ? ART_TYPES : WRITING_TYPES).map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          ) : field.name === 'text' ? (
            <div className="w-3/4 border rounded px-2" style={{ minHeight: '100px', height: 'auto' }}>
              <ReactQuill ref={quillRef} value={text} onChange={handleTextChange} onResize={handleQuillResize} />
            </div>
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

// I need to be able to upload rich text in the Text field in the writing upload form:
// use react-quill for this. It is a rich text editor. 
// be VERY mindful of the styling of the rich text editor. Its a FUCKING NIGHTMARE, and needs special divs and stuff
// to contain its overflow and shit. It really just does not care at all. You must make it submit to your will!
// I mean it. Create 2, 3, 4 divs to contain it. It musnt overflow!! It HAS to displace the other inputfields vertically!
// Like, tell me you understand before commencing:
