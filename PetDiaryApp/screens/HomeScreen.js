import { Button, View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import LogScreen from "./LogScreen";
import ProfileScreen from "./ProfileScreen";
import SpotScreen from "./SpotScreen";
import PressableIcon from "../components/PressableIcon";
import { colors, styles } from "../styles";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  function navigateToProfile() {
    console.log("navigate to profile");
    navigation.navigate("Profile");
  }

  function navigateToNotification() {
    console.log("navigate to notification");
  }

  return (
    <Tab.Navigator
      initialRouteName="Log"
      screenOptions={({ route }) => ({
        headerStyle: styles.homeScreenHeader,
        headerShadowVisible: false,
        headerTitle: () => <Text></Text>,
        headerLeft: () => (
          <PressableIcon pressHandler={navigateToProfile}>
            <Ionicons name="person" size={25} color={colors.iconDefault} />
          </PressableIcon>
        ),
        headerRight: () => (
          <PressableIcon pressHandler={navigateToNotification}>
            <Ionicons
              name="notifications"
              size={25}
              color={colors.iconDefault}
            />
          </PressableIcon>
        ),
        tabBarIcon: ({ focused }) => {
          let color = focused
            ? colors.bottomTabIconFocused
            : colors.bottomTabIconUnfocused;
          let iconName;
          if (route.name === "Log") {
            iconName = "log";
          } else if (route.name === "Spot") {
            iconName = "location";
          }
          return <Octicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: styles.bottomTabBarLabel,
        tabBarActiveTintColor: colors.bottomTabIconFocused,
        tabBarInactiveTintColor: colors.bottomTabIconUnfocused,
      })}
    >
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Spot" component={SpotScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
