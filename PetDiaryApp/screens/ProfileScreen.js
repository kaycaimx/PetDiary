import { FlatList, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";
import PetProfile from "../components/PetProfile";

const ProfileScreen = () => {
  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    // At Iteration 1, we are not using firebase authentication yet, so we are
    // hardcoding the user to "testUser".
    const q = collection(database, "PetDiary", "testUser", "pets");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        let pets = [];
        querySnapshot.forEach((doc) => {
          pets.push({ ...doc.data(), id: doc.id });
        });
        setMyPets(pets);
      } else {
        setMyPets([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>My Pets: </Text>
      <View style={styles.petProfileScrollView}>
        <FlatList
          data={myPets}
          renderItem={({ item }) => (
            <PetProfile
              avatar={item.petAvatar}
              name={item.petName}
              birthday={item.petBirthday}
              gender={item.petGender}
              spayed={item.petSpayed}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
