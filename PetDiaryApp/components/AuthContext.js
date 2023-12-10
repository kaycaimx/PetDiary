import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { writeUserToDB } from "../firebase/firebasehelper";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // a valid user is logged in
        setUser(user.uid);
        setIsUserLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logIn = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("Invalid credentials");
      } else if (err.code === "auth/user-not-found") {
        Alert.alert("User not found");
      } else if (err.code === "auth/wrong-password") {
        Alert.alert("Wrong password");
      } else {
        Alert.alert("Something went wrong");
      }
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      writeUserToDB(userCred.user.uid, email);
    } catch (err) {
      console.log("sign up error ", err.code);
      if (err.code === "auth/invalid-email") {
        Alert.alert("Email is invalid");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("Password should be minimum 6 characters");
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert("Email already in use");
      } else {
        Alert.alert("Something went wrong");
      }
    }
  };

  const logOut = async () => {
    console.log("logout pressed");
    try {
      signOut(auth);
    } catch (err) {
      console.log("singout err", err);
    }
  };

  const value = {
    user,
    isUserLoggedIn,
    logIn,
    signUp,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
