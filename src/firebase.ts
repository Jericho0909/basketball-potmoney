import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGZJ1abrZyqCL2rdEv__mnfxf1NpeW5ss",
  authDomain: "play4pot.firebaseapp.com",
  databaseURL: "https://play4pot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "play4pot",
  storageBucket: "play4pot.firebasestorage.app",
  messagingSenderId: "568239423782",
  appId: "1:568239423782:web:48af7d5b0c96db612fc1e7"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };