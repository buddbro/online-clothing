import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC_pWjSeqWxtwis5lgd32mAgRkt9SCRJps",
  authDomain: "tutorial-online-store.firebaseapp.com",
  databaseURL: "https://tutorial-online-store.firebaseio.com",
  projectId: "tutorial-online-store",
  storageBucket: "tutorial-online-store.appspot.com",
  messagingSenderId: "534151844512",
  appId: "1:534151844512:web:ef6547b19d71fe41ac6fc5",
  measurementId: "G-4BZD7CGGBH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
