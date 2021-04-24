import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD6po2YIUw9yHvEMIFRIxdlHjk2OP2_tjg",
  authDomain: "inventory-70d9f.firebaseapp.com",
  projectId: "inventory-70d9f",
  storageBucket: "inventory-70d9f.appspot.com",
  messagingSenderId: "61778300424",
  appId: "1:61778300424:web:1c57e13bb4c344860e0bbd",
};

const initailApp = firebase.initializeApp(firebaseConfig);
const db = initailApp.firestore(initailApp);
export default db;
