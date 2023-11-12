import { Button, Text, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PetScreen from "./PetScreen";

const TopTab = createMaterialTopTabNavigator();

const LogScreen = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Pet 1" component={PetScreen} />
      <TopTab.Screen name="Pet 2" component={PetScreen} />
    </TopTab.Navigator>
  );
};

export default LogScreen;
