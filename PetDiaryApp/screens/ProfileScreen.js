import { FlatList, Pressable, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { colors, styles } from "../styles";
import { usePets } from "../components/PetsContext";
import PetProfile from "../components/PetProfile";

const ProfileScreen = ({ navigation }) => {
  const { myPets } = usePets();

  function pressHandler() {
    navigation.navigate("Add Log");
  }

  return (
    <SafeAreaView style={styles.container}>
      {myPets.length === 0 ? (
        <Text>You don't have any pet yet.</Text>
      ) : (
        <>
          <Text>My Pets: </Text>
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
