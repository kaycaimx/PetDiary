import React, { useContext, useState, useEffect } from "react";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const PetsContext = React.createContext();

function PetsContextProvider({ children }) {
  const { user } = useAuth();
  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    const q = collection(database, "PetDiary", user, "pets");
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
// either with no curly braces, or have "return" keyword and curly braces!!!!
const usePets = () => useContext(PetsContext);
export { PetsContextProvider, usePets };
