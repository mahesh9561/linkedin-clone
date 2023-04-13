import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // <-- Add this line

const firebaseConfig = {
  apiKey: "AIzaSyDXb2ziqkRbEn-rqde5WbGNQjwYBVhVIZ0",
  authDomain: "linkedin-2735d.firebaseapp.com",
  projectId: "linkedin-2735d",
  storageBucket: "linkedin-2735d.appspot.com",
  messagingSenderId: "947219257414",
  appId: "1:947219257414:web:31a4e4dd8877520665d247"
};
firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); 
const storage = firebase.storage(); // <-- Add this line

export { db, auth, provider, storage };

