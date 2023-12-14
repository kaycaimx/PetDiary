import { FlatList, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { usePets } from "../components/PetsContext";
import { useAuth } from "../components/AuthContext";
import { getUserInfo } from "../firebase/firebasehelper";
import PressableIconWithText from "../components/PressableIconWithText";
import PetProfile from "../components/PetProfile";
import { colors, styles } from "../styles";

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { myPets } = usePets();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function getUserInfoFromDB() {
      try {
        const data = await getUserInfo(user);
        setUserInfo(data.email);
      } catch (err) {
        console.log("Get user email error:", err);
      }
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
        <Text style={styles.profileLabel}>You don't have any pet yet.</Text>
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
          <PressableIconWithText pressHandler={pressHandler}>
            <AntDesign
              name="pluscircle"
              size={30}
              color={colors.defaultTextColor}
            />
            <Text style={styles.iconWithTextPressableText}>
              Let's start adding log for your pets!
            </Text>
          </PressableIconWithText>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
