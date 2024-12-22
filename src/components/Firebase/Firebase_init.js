import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_apiKey,
  //   authDomain: import.meta.env.VITE_authDomain,
  //   projectId: import.meta.env.VITE_projectId,
  //   storageBucket: import.meta.env.VITE_storageBucket,
  //   messagingSenderId: import.meta.env.VITE_messagingSenderId,
  //   appId: import.meta.env.VITE_appId,

  apiKey: "AIzaSyCEDgkY553cH057W3iAvfVIs8iMjq-TcAA",
  authDomain: "library-managememt-system.firebaseapp.com",
  projectId: "library-managememt-system",
  storageBucket: "library-managememt-system.firebasestorage.app",
  messagingSenderId: "414570852393",
  appId: "1:414570852393:web:75a88229b0f3350c322c38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
