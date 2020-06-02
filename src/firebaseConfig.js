import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDuIPmP3x7zV7wbB9prAegaWla-93pnwsg",
    authDomain: "reshoes-app.firebaseapp.com",
    databaseURL: "https://reshoes-app.firebaseio.com",
    projectId: "reshoes-app",
    storageBucket: "reshoes-app.appspot.com",
    messagingSenderId: "28298377947",
    appId: "1:28298377947:web:ae82ae18d2ecfcd4c8aafe",
    measurementId: "G-VM6HYNECCP"
  };

  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;

