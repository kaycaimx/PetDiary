import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { database } from "./firebase/firebaseSetup";

import HomeScreen from "./screens/HomeScreen";
import AddLogScreen from "./screens/AddLogScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { colors } from "./styles";
import EditLogScreen from "./screens/EditLogScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  //console.log(database);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.backgroundColor },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Log" component={EditLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
