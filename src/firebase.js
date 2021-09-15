// import firebase from 'firebase';

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyA8c9TtmDX2Iq36igJYlxamEk-Qc50SFpo",
//     authDomain: "ait-chrome-extension.firebaseapp.com",
//     projectId: "ait-chrome-extension",
//     storageBucket: "ait-chrome-extension.appspot.com",
//     messagingSenderId: "39912556137",
//     appId: "1:39912556137:web:e526e38b3664c0401844f8",
//     measurementId: "G-LQDNVDG8LC"
//   });
//   const db = firebaseApp.firestore();
//   const auth = firebaseApp.auth();
//   const storage = firebaseApp.storage();
  
//   export { db, auth, storage };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8c9TtmDX2Iq36igJYlxamEk-Qc50SFpo",
  authDomain: "ait-chrome-extension.firebaseapp.com",
  projectId: "ait-chrome-extension",
  storageBucket: "ait-chrome-extension.appspot.com",
  messagingSenderId: "39912556137",
  appId: "1:39912556137:web:e526e38b3664c0401844f8",
  measurementId: "G-LQDNVDG8LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export{ db }
