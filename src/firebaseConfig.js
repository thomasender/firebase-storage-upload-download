import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQNShLmN5mbaaali2J6-oUQp5EGKrFxRs",
  authDomain: "imagehub-4b2d3.firebaseapp.com",
  projectId: "imagehub-4b2d3",
  storageBucket: "imagehub-4b2d3.appspot.com",
  messagingSenderId: "532196777916",
  appId: "1:532196777916:web:c89bac61b2d8d4017315b9"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
