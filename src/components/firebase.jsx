import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDO6Nq1Amp1MZPpByIwpENF0Ox68d7n_64",
    authDomain: "my-project-list-63031.firebaseapp.com",
    projectId: "my-project-list-63031",
    storageBucket: "my-project-list-63031.appspot.com",
    messagingSenderId: "770805623041",
    appId: "1:770805623041:web:c765b5e4f78844b6121300",
})

const db = firebaseApp.firestore();

export {db};