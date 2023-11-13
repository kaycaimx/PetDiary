import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { auth } from "./firebaseSetup";

export async function writeLogToDB(log) {
  try {
    console.log(auth.currentUser.uid);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(database, "logs"), {
      ...log,
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
