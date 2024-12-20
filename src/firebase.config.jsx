import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwL_O2U_w68VyibdXqHfS4yQ0XnyAyRyw",
  authDomain: "esfdr2401note.firebaseapp.com",
  projectId: "esfdr2401note",
  storageBucket: "esfdr2401note.firebasestorage.app",
  messagingSenderId: "240250371175",
  appId: "1:240250371175:web:7782ca8c335b22e09568c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app