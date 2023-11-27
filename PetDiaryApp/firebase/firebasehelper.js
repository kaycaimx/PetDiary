import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeLogToDB(petID, log) {
  try {
    //console.log(auth.currentUser.uid);
    // Add a new document with a generated id.
    const petDocRef = doc(database, "PetDiary", "testUser", "pets", petID);
    const docRef = await addDoc(collection(petDocRef, "logs"), {
      ...log,
      createdAt: serverTimestamp(),
      //user: auth.currentUser.uid,
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
