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
export async function getUserInfo() {
  try {
    const docSnapshot = await getDoc(
      doc(database, "PetDiary", auth.currentUser.uid)
    );
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
  } catch (err) {
    console.log("get user info ", err);
  }
}

export async function writeLogToDB(petID, log) {
  try {
    //console.log(auth.currentUser.uid);
    // Add a new document with a generated id.
    const petDocRef = doc(database, "PetDiary", "testUser", "pets", petID);
    const docRef = await addDoc(collection(petDocRef, "logs"), {
      ...log,
      createdAt: serverTimestamp(),
      user: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteLogFromDB(id) {
  try {
    await deleteDoc(doc(database, "logs", id));
  } catch (err) {
    console.log(err);
  }
}

export async function writePetToDB(pet) {
  try {
    // At Iteration 1, we are not using firebase authentication yet, so we are
    // hardcoding the user to "testUser".  In Iteration 2, we will use firebase
    // authentication to get the user id.
    const petSubcollectionRef = collection(
      database,
      "PetDiary",
      "testUser",
      "pets"
    );
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
