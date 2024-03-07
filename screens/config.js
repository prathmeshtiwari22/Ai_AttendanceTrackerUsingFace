import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB1SG_HuFmzpewlUM_rIfPbm30C_64uws",
  authDomain: "vega-a0de6.firebaseapp.com",
  projectId: "vega-a0de6",
  storageBucket: "vega-a0de6.appspot.com",
  messagingSenderId: "135599918398",
  appId: "1:135599918398:web:042991efab60363873b06f",
  measurementId: "G-E7Q3SL0XKK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
