import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyDDGD-JWI_Gff_w2R9Be4bvAJn35Y3yW3I",
  authDomain: "products-be245.firebaseapp.com",
  projectId: "products-be245",
  storageBucket: "products-be245.appspot.com",
  messagingSenderId: "813670706382",
  appId: "1:813670706382:web:468d042a5a1cdf6ad6f49f",
  measurementId: "G-EM82CNPTKG"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

export { db, storage };
