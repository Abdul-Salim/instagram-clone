import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC1B3SViLP9MBzhqflrShYjxXb4LNTH-oc",
    authDomain: "instagram-clone-b4c95.firebaseapp.com",
    projectId: "instagram-clone-b4c95",
    storageBucket: "instagram-clone-b4c95.appspot.com",
    messagingSenderId: "767707470401",
    appId: "1:767707470401:web:1898ab39738ef7ad8344c0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);
const auth = firebase.auth(firebaseApp);
var provider = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage(firebaseApp);
export { db, auth, storage, provider };
