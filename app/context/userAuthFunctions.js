import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import "firebase/auth";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (_user) => {
    if (_user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("I am in userAuthFunctions.js", _user)
        setUser(_user)
        // ...
    } else {
        // User is signed out
        // ...
    }
  });
  
  const [chatRooms, setChatRooms] = useState([]);


  async function logIn(email, password) {
    let result;
    let res;
    try {
      res = await setPersistence(auth, browserLocalPersistence);
      result = await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async function signUp(email, password) {

    console.log(email, password)
    const _user = await createUserWithEmailAndPassword(auth, email, password);
    //const uid = _user.user.uid;

    const data = {
      //id: uid,
      email
    };

    //await setDoc(doc(db, 'users', uid), data);
    setUser(_user)
    //console.log(user.user.uid)

    let signin = await logIn(email, password);

    console.log("logged in with new user", signin);

  }

  async function logOut() {
    console.log("loggin out")
    const res = await signOut(auth)
    console.log(res)
    setUser(null);
    return "successfuly logged out"

  }

  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleAuthProvider);
  }

  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  if (user != null) {
  return (
    <AuthContext.Provider value={{ logIn, signUp, logOut, googleSignIn, user, setUser, resetPassword, chatRooms, setChatRooms }}>
      {children}
    </AuthContext.Provider>
  )
  } else {
    setUser([]);
    return (
      <AuthContext.Provider value={{ logIn, signUp, logOut, googleSignIn, user, setUser, resetPassword, chatRooms, setChatRooms }}>
        {children}
      </AuthContext.Provider>
    )
  }
   
}

export const useStateContext = () => useContext(AuthContext);

