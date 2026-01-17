import React, { createContext, useState, useEffect } from "react";
import { 
  auth, 
  createUserProfileDocument, 
  // ensure these are exported from your firebase.utils.js or import from firebase/auth directly
} from "../firebase/firebase.utils"; 
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";

// Helper to access Google Provider (if not exported nicely from utils)
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  signInGoogle: () => {},
  signInEmail: () => {},
  signUpUser: () => {},
  signOutUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Replaces: signInWithGoogle saga
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("Error signing in with Google", error);
    }
  };

  // Replaces: signInWithEmail saga
  const signInEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Error signing in with email", error);
      throw error; // Re-throw to handle in component if needed
    }
  };

  // Replaces: signUp saga
  const signUpUser = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.log("Error signing up", error);
      throw error;
    }
  };

  // Replaces: signOut saga
  const signOutUser = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  // Replaces: onCheckUserSession saga
  // This effect listens to auth state changes automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // Subscribe to the user document to get data (like displayName, id)
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = { 
    currentUser, 
    signInGoogle, 
    signInEmail, 
    signUpUser, 
    signOutUser 
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};