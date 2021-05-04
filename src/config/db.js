import firebase from "firebase";
import * as admin from "firebase-admin";

var firebaseConfig = {
  apiKey: "AIzaSyBj9ipv9b0G9tjKDFMYeXz32MjTz_FJ10g",
  authDomain: "donationsystem-fbc9c.firebaseapp.com",
  projectId: "donationsystem-fbc9c",
  storageBucket: "donationsystem-fbc9c.appspot.com",
  messagingSenderId: "377897351634",
  appId: "1:377897351634:web:d571fbf39b88c851e2b00b",
};

const initailApp = firebase.initializeApp(firebaseConfig);
const db = initailApp.firestore(initailApp);
export const auth = firebase.auth();
export default db;
// export const administrator = admin.initializeApp()
