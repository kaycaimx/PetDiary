import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "./firebaseSetup";
import { storage } from "./firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";
import { auth } from "./firebaseSetup";

export async function writeUserToDB(uid, email) {
  try {
    await setDoc(doc(database, "PetDiary", uid), {
      email: email,
    });
  } catch (err) {
    console.log("save user info", err);
  }
}

// add getUserInfo and use getDoc()
// return data
export async function getUserInfo(uid) {
  try {
    const docSnapshot = await getDoc(doc(database, "PetDiary", uid));
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  } catch (err) {
    console.log("get user info ", err);
  }
}

export async function writeLogToDB(uid, petID, log) {
  try {
    const petDocRef = doc(database, "PetDiary", uid, "pets", petID);
    const docRef = await addDoc(collection(petDocRef, "logs"), {
      ...log,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function writePetToDB(uid, pet) {
  try {
    const petSubcollectionRef = collection(database, "PetDiary", uid, "pets");
    const docRef = await addDoc(petSubcollectionRef, pet);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function getAvatarFromDB(avatarURI) {
  try {
    const avatarRef = ref(storage, avatarURI);
    const avatarURL = await getDownloadURL(avatarRef);
    return avatarURL;
  } catch (err) {
    console.log("Error downloading the pet avatar image: ", err);
  }
}
