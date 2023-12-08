import React, { useContext, useState, useEffect } from "react";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";

const PetsContext = React.createContext();

function PetsContextProvider({ children }) {
  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    // At Iteration 1, we are not using firebase authentication yet, so we are
    // hardcoding the user to "testUser".
    const q = collection(database, "PetDiary", "testUser", "pets");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        let pets = [];
        querySnapshot.forEach((doc) => {
          pets.push({ ...doc.data(), id: doc.id, isChecked: true });
        });
        setMyPets(pets);
      } else {
        setMyPets([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    myPets,
    setMyPets,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

const usePets = () => useContext(PetsContext);
export { PetsContextProvider, usePets };
