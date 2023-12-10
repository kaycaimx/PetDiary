import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { AntDesign } from "@expo/vector-icons";

import EditLogScreen from "./screens/EditLogScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PressableIcon from "./components/PressableIcon";
import { colors } from "./styles";
import { PetsContextProvider } from "./components/PetsContext";
import { useAuth } from "./components/AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { logOut } = useAuth();

  return (
    <PetsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundColor },
            headerTintColor: colors.defaultTextColor,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerRight: () => {
                return (
                  <PressableIcon pressHandler={logOut}>
                    <AntDesign
                      name="logout"
                      size={25}
                      color={colors.iconDefault}
                    />
                  </PressableIcon>
                );
              },
            }}
          />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Edit Log" component={EditLogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PetsContextProvider>
  );
};

export default AppStack;
