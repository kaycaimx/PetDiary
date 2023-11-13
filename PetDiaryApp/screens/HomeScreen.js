import { Button, View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import AddLog from "./AddLogScreen";
import LogScreen from "./LogScreen";
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

  const headerWithIcons = {
    headerTitle: () => <Text></Text>,
    headerLeft: () => (
      <PressableIcon pressHandler={navigateToProfile}>
        <Ionicons name="person" size={25} color={colors.iconDefault} />
      </PressableIcon>
    ),
    headerRight: () => (
      <PressableIcon pressHandler={navigateToNotification}>
        <Ionicons name="notifications" size={25} color={colors.iconDefault} />
      </PressableIcon>
    ),
  };

  const headerWithBack = {
    tabBarLabel: () => <Text></Text>,
    headerTitle: () => (
      <Text style={styles.homeScreenHeaderTitle}>Add an activity</Text>
    ),
    headerLeft: () => (
      <PressableIcon pressHandler={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-outline"
          size={25}
          color={colors.iconDefault}
        />
      </PressableIcon>
    ),
  };

  return (
    <Tab.Navigator
      initialRouteName="Log"
      screenOptions={({ route }) => ({
        headerStyle: styles.homeScreenHeader,
        headerShadowVisible: false,

        tabBarStyle: styles.bottomTabBar,
        tabBarIcon: ({ focused }) => {
          let color = focused
            ? colors.bottomTabIconFocused
            : colors.bottomTabIconUnfocused;
          let iconName;
          if (route.name === "Log") {
            iconName = "log";
          } else if (route.name === "Spot") {
            iconName = "location";
          } else {
            return (
              <View style={styles.bigAddButton}>
                <Ionicons
                  name="add-circle"
                  size={80}
                  color={colors.bottomTabIconFocused}
                />
              </View>
            );
          }
          return <Octicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: styles.bottomTabBarLabel,
        tabBarActiveTintColor: colors.bottomTabIconFocused,
        tabBarInactiveTintColor: colors.bottomTabIconUnfocused,
      })}
    >
      <Tab.Screen name="Log" component={LogScreen} options={headerWithIcons} />
      <Tab.Screen name="Add Log" component={AddLog} options={headerWithBack} />
      <Tab.Screen
        name="Spot"
        component={SpotScreen}
        options={headerWithIcons}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
