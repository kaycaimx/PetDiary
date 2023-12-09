import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";

import EditLogScreen from "./screens/EditLogScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { colors } from "./styles";
import { PetsContextProvider } from "./components/PetsContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </>
);

const AppStack = (
  <>
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
            <PressableButton
              pressedFunction={() => {
                console.log("logout pressed");
                try {
                  signOut(auth);
                } catch (err) {
                  console.log("singout err", err);
                }
              }}
              defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
              pressedStyle={{ opacity: 0.6 }}
            >
              <Ionicons name="exit" size={24} color="black" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Edit Log" component={EditLogScreen} />
  </>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // a valid user is logged in
        setIsUserLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //console.log(database);
  return (
    <PetsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundColor },
          }}
          initialRouteName="Signup"
        >
          {isUserLoggedIn ? AppStack : AuthStack}
        </Stack.Navigator>
      </NavigationContainer>
    </PetsContextProvider>
  );
}
