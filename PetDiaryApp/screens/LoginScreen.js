import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";

import PressableButton from "../components/PressableButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { styles } from "../styles";

export default function LoginScreen({ navigation }) {
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
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("Invalid credentials");
      } else if (err.code === "auth/user-not-found") {
        Alert.alert("User not found");
      } else if (err.code === "auth/wrong-password") {
        Alert.alert("Wrong password");
      } else {
        Alert.alert("Something went wrong");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require("../assets/loginPic.jpg")} style={styles.image} />
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
