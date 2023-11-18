import { Button, Dimensions, Image, Text, SafeAreaView } from "react-native";

import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

import AddPetIcon from "../components/AddPetIcon";
import AddPetScreen from "./AddPetScreen";
import PetScreen from "./PetScreen";
import PetAvatar from "../components/PetAvatar";
import { colors, styles } from "../styles";

const TopTab = createMaterialTopTabNavigator();

const LogScreen = () => {
  // const currentRoute = useRoute();
  // const routeName = getFocusedRouteNameFromRoute(currentRoute);
  // console.log(routeName);

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
      {myPets &&
        myPets.map((pet) => (
          <TopTab.Screen
            name={pet.petName}
            key={pet.id}
            component={PetScreen}
            options={{
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
