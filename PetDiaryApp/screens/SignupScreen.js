import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";

import PressableButton from "../components/PressableButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { writeUserToDB } from "../firebase/firebasehelper";
import { styles } from "../styles";

export default function SignupScreen({ navigation }) {
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
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      writeUserToDB(userCred.user.uid, email);
      // console.log(userCred);
    } catch (err) {
      console.log("sign up error ", err.code);
      if (err.code === "auth/invalid-email") {
        Alert.alert("Email is invalid");
      } else if (err.code === "auth/weak-password") {
        Alert.alert("Password should be minimum 6 characters");
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert("Email already in use");
      } else {
        Alert.alert("Something went wrong");
      }
    }
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
