import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";

import PressableButton from "../components/PressableButton";
import { styles } from "../styles";
import { useAuth } from "../components/AuthContext";

export default function LoginScreen({ navigation }) {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    navigation.replace("Signup");
  };

  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Fields should not be empty.");
      return;
    }
    await logIn(email, password);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require("../assets/cat-diary.jpg")}
        style={styles.loginImage}
      />
      <Text style={styles.loginTitle}>Pet Diary</Text>
      <Text style={styles.loginLabel}>
        - Track every day of your furry friend -
      </Text>
      <Text style={styles.addPetLabel}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.searchBar}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.addPetLabel}>Password</Text>
      <TextInput
        style={styles.searchBar}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <PressableButton
        pressedFunction={loginHandler}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <Text style={styles.buttonText}>Login</Text>
      </PressableButton>
      <PressableButton
        pressedFunction={signupHandler}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <Text style={styles.buttonText}>New User? Create An Account</Text>
      </PressableButton>
    </KeyboardAvoidingView>
  );
}
