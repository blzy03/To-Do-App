import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 //api key
const firebaseConfig = {
  apiKey: "AIzaSyCIw4buST4V_IX_T-xFUogf3DhZ0S3QdVQ",
  authDomain: "to-do-list-c79df.firebaseapp.com",
  projectId: "to-do-list-c79df",
  storageBucket: "to-do-list-c79df.appspot.com",
  messagingSenderId: "1097801874097",
  appId: "1:1097801874097:web:56e2806b62b686c9fc0090"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth()
const provider= new GoogleAuthProvider()
const db = getFirestore(app)//defining firebase firestore database

export{auth,provider,db}

