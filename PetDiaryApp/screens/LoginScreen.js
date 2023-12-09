import { View, Text, TextInput, Button, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";
import { styles } from '../styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    navigation.replace("Signup");
  };

  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Fields should not be empty");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("invalid credentials");
      }
    }
  };

  return (
    <View style={styles.LoginContainer}>
      <Image
        source={require("../assets/loginPic.jpg")}
        style={styles.image}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandler} />
    </View>
  )
}