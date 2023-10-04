import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD5MVjhnJdEgzK3P3I8Xsy0wHwN1CaFK1Q",
  authDomain: "pupd-yuj.firebaseapp.com",
  projectId: "pupd-yuj",
  storageBucket: "pupd-yuj.appspot.com",
  messagingSenderId: "818351586023",
  appId: "1:818351586023:web:a3f1ce0a226b436e944042",
  databaseUrl:"https://pupd-yuj-default-rtdb.firebaseio.com/" 
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export { firebaseApp, auth, database };

