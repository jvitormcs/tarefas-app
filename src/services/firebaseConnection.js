import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyC8KIlmi81sITdQVZA3gfgBD4EU8NdPbL0",
    authDomain: "tarefas-45db9.firebaseapp.com",
    projectId: "tarefas-45db9",
    storageBucket: "tarefas-45db9.appspot.com",
    messagingSenderId: "996174492276",
    appId: "1:996174492276:web:6ff9f35442b82049691721"
  };

  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }

  export default firebase;