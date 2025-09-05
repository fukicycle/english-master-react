import {
  signInAnonymously,
  signInWithPopup,
  linkWithCredential,
} from "firebase/auth";
import { auth, provider } from "../services/firebase";

export const handleLAnonymousToGoogleUser = async () => {
  try {
    const googleUser = await signInWithPopup(auth, provider);
    linkWithCredential(auth.currentUser, googleUser);
  } catch (e) {
    console.error(e);
  }
};

export const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error(e);
  }
};

export const handleAnonymousLogin = async () => {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.error(e);
  }
};

export const handleLogout = () => {
  try {
    auth.signOut();
  } catch (e) {
    console.error(e);
  }
};
