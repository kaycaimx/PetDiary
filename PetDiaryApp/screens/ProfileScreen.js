import {
  Button,
  FlatList,
  Pressable,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { colors, styles } from "../styles";
import { usePets } from "../components/PetsContext";
import { getUserInfo } from "../firebase/firebasehelper";
import PetProfile from "../components/PetProfile";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    }
    getUser();
  }, []);

  const { myPets } = usePets();

  function pressHandler() {
    navigation.navigate("Add Log");
  }

  async function testGetUser() {
    console.log("test get user");
    const user = await getUserInfo();
    console.log(user);
  }

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <>
          <Text style={styles.profileLabel}>My email: </Text>
          <Text>{user.email}</Text>
        </>
      )}
      {myPets.length === 0 ? (
        <Text>You don't have any pet yet.</Text>
      ) : (
        <>
          <Text style={styles.profileLabel}>My Pets: </Text>
          <View style={styles.petProfileScrollView}>
            <FlatList
              data={myPets}
              renderItem={({ item }) => (
                <PetProfile
                  avatarUri={item.petAvatar}
                  name={item.petName}
                  birthday={item.petBirthday}
                  gender={item.petGender}
                  spayed={item.petSpayed}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Pressable
            onPress={pressHandler}
            style={({ pressed }) => {
              return [
                styles.profileToLogPressable,
                pressed && styles.profileToLogPressed,
              ];
            }}
          >
            <AntDesign
              name="pluscircle"
              size={30}
              color={colors.defaultTextColor}
            />
            <Text style={styles.profileToLogPressableText}>
              Let's start adding log for your pets!
            </Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
