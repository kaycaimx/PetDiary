import { Button, Dimensions, Image, Text, SafeAreaView } from "react-native";

import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AddPetIcon from "../components/AddPetIcon";
import AddPetScreen from "./AddPetScreen";
import PetScreen from "./PetScreen";
import PetAvatar from "../components/PetAvatar";
import PlaceHolder from "../components/PlaceHolder";
import { colors, styles } from "../styles";
import { usePets } from "../components/PetsContext";

const TopTab = createMaterialTopTabNavigator();

const LogScreen = () => {
  const { myPets } = usePets();

  return (
    <TopTab.Navigator
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={({ route }) => ({
        tabBarStyle: styles.topTabBar,
        tabBarLabel: ({ focused }) => (
          <Text
            style={[
              styles.topTabBarLabel,
              {
                color: focused
                  ? colors.bottomTabIconFocused
                  : colors.bottomTabIconUnfocused,
              },
            ]}
          >
            {route.name}
          </Text>
        ),
        tabBarIndicatorStyle: styles.topTabBarIndicator,
        tabBarScrollEnabled: true,
      })}
    >
      {myPets.length === 0 && (
        <TopTab.Screen
          name={"Placeholder"}
          component={PlaceHolder}
          options={{ tabBarLabel: () => <Text></Text> }}
        />
      )}
      {myPets.length !== 0 &&
        myPets.map((pet) => (
          <TopTab.Screen
            name={pet.id}
            key={pet.id}
            component={PetScreen}
            options={{
              tabBarLabel: () => (
                <Text style={{ marginTop: 12, textAlign: "center" }}>
                  {pet.petName}
                </Text>
              ),
              tabBarIcon: ({ focused }) => {
                return (
                  <PetAvatar focused={focused} avatarURI={pet.petAvatar} />
                );
              },
            }}
          />
        ))}
      <TopTab.Screen
        name={"Add pet"}
        component={AddPetScreen}
        options={{
          tabBarLabel: () => <Text></Text>,
          tabBarIcon: ({ focused }) => <AddPetIcon focused={focused} />,
        }}
      />
    </TopTab.Navigator>
  );
};

export default LogScreen;
