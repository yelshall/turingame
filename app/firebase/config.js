// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_-dBNGK2DWTUBmb34T_B-D2KZVCm1CuI",
    authDomain: "turinggame-8d084.firebaseapp.com",
    projectId: "turinggame-8d084",
    storageBucket: "turinggame-8d084.appspot.com",
    messagingSenderId: "672739661251",
    appId: "1:672739661251:web:2fc33fe2b083097a715976",
    measurementId: "G-P9YNL7WWQH"
};
  

// Initialize Firebase
let analytics;
export const app = initializeApp(firebaseConfig);

if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export const initFirebase = () => {
    return app;
}

export {analytics}

export const db = getFirestore(app);


export const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user)
    // ...
  } else {
    // User is signed out
    // ...
  }
});


