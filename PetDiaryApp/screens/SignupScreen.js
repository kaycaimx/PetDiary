import {
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";

import PressableButton from "../components/PressableButton";
import { styles } from "../styles";
import { useAuth } from "../components/AuthContext";

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Please fill all the fields.");
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert("Password and confirm password should be the same.");
      return;
    }
    await signUp(email, password);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <Image source={require("../assets/loginPic.jpg")} style={styles.image} /> */}
      <Text style={styles.addPetLabel}>Email</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Email"
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
      <Text style={styles.addPetLabel}>Confirm Password</Text>
      <TextInput
        style={styles.searchBar}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <PressableButton
        pressedFunction={signupHandler}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <Text style={styles.buttonText}>Register</Text>
      </PressableButton>
      <PressableButton
        pressedFunction={loginHandler}
        defaultStyle={styles.loginButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <Text style={styles.buttonText}>Already registered? Login</Text>
      </PressableButton>
    </KeyboardAvoidingView>
  );
}
