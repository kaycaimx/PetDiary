import { Button, Dimensions, Image, Text, SafeAreaView } from "react-native";

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign } from "@expo/vector-icons";

import AddPetScreen from "./AddPetScreen";
import PetScreen from "./PetScreen";
import PetAvatar from "../components/PetAvatar";
import { colors, styles } from "../styles";

const TopTab = createMaterialTopTabNavigator();

const LogScreen = () => {
  const samplePets = [
    {
      name: "Pikachu",
      id: 1,
      avatarURI:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    },
    {
      name: "Gengar",
      id: 2,
      avatarURI:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png",
    },
    {
      name: "Shellder",
      id: 3,
      avatarURI:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/090.png",
    },
  ];

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
      {samplePets &&
        samplePets.map((pet) => (
          <TopTab.Screen
            name={pet.name}
            key={pet.id}
            component={PetScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <PetAvatar focused={focused} avatarURI={pet.avatarURI} />
                );
              },
            }}
          />
        ))}
      <TopTab.Screen
        name={"Add pet"}
        component={AddPetScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="pluscircleo"
              size={26}
              color={
                focused
                  ? colors.bottomTabIconFocused
                  : colors.bottomTabIconUnfocused
              }
            />
          ),
        }}
      />
    </TopTab.Navigator>
  );
};

export default LogScreen;
