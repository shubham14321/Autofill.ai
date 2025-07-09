import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./firebase";
import { apiRequest } from "./queryClient";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithRedirect(auth, googleProvider);
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      await createOrUpdateUser(result.user);
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createOrUpdateUser(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createOrUpdateUser(result.user, name);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

const createOrUpdateUser = async (firebaseUser: User, displayName?: string) => {
  try {
    const userData = {
      email: firebaseUser.email!,
      name: displayName || firebaseUser.displayName || firebaseUser.email!.split('@')[0],
      firebaseUid: firebaseUser.uid,
    };

    // Try to get existing user first
    const existingUser = await fetch(`/api/users/${firebaseUser.uid}`);
    
    if (existingUser.status === 404) {
      // Create new user
      await apiRequest('POST', '/api/users', userData);
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
};
