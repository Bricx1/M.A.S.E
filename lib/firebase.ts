import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAYOVslG4d6WkFHu6kD9hVwnpYBpF3FN0I",
  authDomain: "mase-a33f5.firebaseapp.com",
  projectId: "mase-a33f5",
  storageBucket: "mase-a33f5.firebasestorage.app",
  messagingSenderId: "407255269",
  appId: "1:407255269:web:680b98de984ea7cb74bc0c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
