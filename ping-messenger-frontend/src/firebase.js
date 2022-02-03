// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA8LtzFulsT7A2i6FR4O24fFM3hLQj3r2I",
    authDomain: "ping-messenger-7450c.firebaseapp.com",
    projectId: "ping-messenger-7450c",
    storageBucket: "ping-messenger-7450c.appspot.com",
    messagingSenderId: "353692271690",
    appId: "1:353692271690:web:da84dcbda3e55d29bd52b3",
    measurementId: "G-WJSP6R7JEZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };