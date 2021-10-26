import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDGSCKMpM-n7FSxZ8Hxl85KOYSkDKW4kjk",
  authDomain: "instagram-cl-b14bc.firebaseapp.com",
  projectId: "instagram-cl-b14bc",
  storageBucket: "instagram-cl-b14bc.appspot.com",
  messagingSenderId: "427669251295",
  appId: "1:427669251295:web:e9bba992ad2dccb012f56a",
  measurementId: "G-JDG3EPK6WR"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export{db, auth , storage};