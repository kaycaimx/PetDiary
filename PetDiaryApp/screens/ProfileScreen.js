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

import { usePets } from "../components/PetsContext";
import { useAuth } from "../components/AuthContext";
import { getUserInfo } from "../firebase/firebasehelper";
import PetProfile from "../components/PetProfile";
import { colors, styles } from "../styles";

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  console.log(user);
  const { myPets } = usePets();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function getUserInfoFromDB() {
      const data = await getUserInfo(user);
      setUserInfo(data.email);
    }
    getUserInfoFromDB();
  }, []);

  function pressHandler() {
    navigation.navigate("Add Log");
  }

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <>
          <Text style={styles.profileLabel}>My email: </Text>
          <Text>{userInfo}</Text>
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
