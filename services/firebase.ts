// FIX: Updated Firebase service to use the v9 compatibility library to match project dependencies.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
// FIX: Imported College type.
import type { CareerStream, College, StreamData, EntrepreneurshipData } from '../types';

// Your web app's Firebase configuration
// IMPORTANT: To fix 'auth/unauthorized-domain' errors, you MUST add your application's domain
// to the list of authorized domains in your Firebase project console.
// Go to: Firebase Console > Authentication > Settings > Authorized domains > Add domain.
// For local development, you need to add 'localhost'.
const firebaseConfig = {
  apiKey: "AIzaSyASPwQ7JQOkKCaphVGdNdU5jc91T_TGKD8",
  authDomain: "peekafuture-472405.firebaseapp.com",
  projectId: "peekafuture-472405",
  storageBucket: "peekafuture-472405.firebasestorage.app",
  messagingSenderId: "723380636666",
  appId: "1:723380636666:web:2a1b2c3d4e5f6a7b8c9d0e"
};

// FIX: Use v8 initialization which is compatible with the compat library.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// FIX: onAuthStateChanged is a method on the auth object in v8/compat.
// Exporting the auth object itself. The consumer (App.tsx) correctly uses it.
export { auth };

// NOTE: onAuthStateChanged is not exported as a standalone function as it's a method on the auth object in v8/compat.
// App.tsx calls auth.onAuthStateChanged().

export const signInWithGoogle = () => {
  // FIX: Use v8/compat signInWithPopup method.
  return auth.signInWithPopup(googleProvider);
};

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  // FIX: Use v8/compat createUserWithEmailAndPassword and updateProfile methods.
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  // After user is created, update their profile with the display name
  if (userCredential.user) {
    await userCredential.user.updateProfile({ displayName });
  }
  return userCredential;
};

export const signInWithEmail = (email: string, password: string) => {
  // FIX: Use v8/compat signInWithEmailAndPassword method.
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  // FIX: Use v8/compat signOut method.
  return auth.signOut();
};

export const getCareerStreamData = async (): Promise<CareerStream[]> => {
  // FIX: Use v8/compat firestore syntax.
  const careerCollection = db.collection('careers');
  const careerSnapshot = await careerCollection.get();
   if (careerSnapshot.empty) {
        console.error("CRITICAL: 'careers' collection is empty in Firestore.");
        return [];
    }
  const careerList = careerSnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().stream,
    avg_salary: doc.data().avg_salary,
  } as CareerStream));
  return careerList;
};

export const getCollegeData = async (): Promise<College[]> => {
  // FIX: Use v8/compat firestore syntax.
  const collegeCollection = db.collection('colleges');
  const collegeSnapshot = await collegeCollection.get();
   if (collegeSnapshot.empty) {
        console.error("CRITICAL: 'colleges' collection is empty in Firestore.");
        return [];
    }
  const collegeList = collegeSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as College));
  return collegeList;
};

export const getStreamData = async (): Promise<StreamData[]> => {
  // FIX: Use v8/compat firestore syntax.
  const streamCollection = db.collection('streams');
  const streamSnapshot = await streamCollection.get();
  if (streamSnapshot.empty) {
    console.error("CRITICAL: 'streams' collection is empty in Firestore.");
    return [];
  }
  return streamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StreamData));
};

export const getEntrepreneurshipData = async (): Promise<EntrepreneurshipData[]> => {
  // FIX: Use v8/compat firestore syntax.
  const entreCollection = db.collection('entrepreneurship');
  const entreSnapshot = await entreCollection.get();
  if (entreSnapshot.empty) {
    console.error("CRITICAL: 'entrepreneurship' collection is empty in Firestore.");
    return [];
  }
  return entreSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EntrepreneurshipData));
};

// Cloud Function Caller
// FIX: Use v8/compat functions syntax.
export const getRoadmapPdf = functions.httpsCallable('generatePdfReport');