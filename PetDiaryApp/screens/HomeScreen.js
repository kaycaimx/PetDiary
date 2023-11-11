import { Button, View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogScreen from "./LogScreen";
import ProfileScreen from "./ProfileScreen";
import SpotScreen from "./SpotScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  function pressHandler() {
    navigation.navigate("Add Log");
  }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Spot" component={SpotScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
