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

// write user info to database when user first registers
// every user has a unique document under PetDiary collection with uid as the document id
// so that each user's data is separated
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
// return data, mainly email to show in ProfileScreen
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

// write log to database using the uid and petID
// so that each user's each pet's logs are separated
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

// write pet to database using the uid
// so that each user's pets are separated
export async function writePetToDB(uid, pet) {
  try {
    const petSubcollectionRef = collection(database, "PetDiary", uid, "pets");
    const docRef = await addDoc(petSubcollectionRef, pet);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

// get image download URL from Firebase Storage
export async function getImageFromDB(imageURI) {
  try {
    const imageRef = ref(storage, imageURI);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
  } catch (err) {
    console.log("Error downloading the image: ", err);
  }
}
