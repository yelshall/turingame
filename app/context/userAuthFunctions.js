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
import "firebase/auth";


const AuthContext = createContext();

export const  AuthContextProvider = ({children}) => {

  const [user, setUser] = useState([]);

  async function logIn(email, password) {
    const _user = await setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)});
    console.log(auth.currentUser);
    setUser(auth.currentUser);
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
    console.log("logged in with new user", signin)

  }

  async function logOut() {   
      console.log("loggin out")
      const res = await signOut(auth)
      console.log(res)
      setUser(res);
      return "successfuly logged out"
   
  }

  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleAuthProvider);
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email); 
  }

  return (
    <AuthContext.Provider  value={{logIn, signUp, logOut, googleSignIn, user, setUser, resetPassword}}> 

      {children}
    </AuthContext.Provider>
  ); 
}

export const useStateContext = () => useContext(AuthContext);

