import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBK4pFGbj1sFogNMVTljoZ5nbuNbLBnTJA",
  authDomain: "freelancing-dfd38.firebaseapp.com",
  projectId: "freelancing-dfd38",
  storageBucket: "freelancing-dfd38.appspot.com",
  messagingSenderId: "339419397651",
  appId: "1:339419397651:web:6a0228cc9eaa5a69f889e6"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
