import { Button, Text, SafeAreaView } from "react-native";
import React from "react";

const PetScreen = ({ navigation }) => {
  function pressHandler() {
    navigation.navigate("Add Log");
  }

  return (
    <SafeAreaView>
      <Text>Pet Screen</Text>
      <Button title="Navigate to Add" onPress={pressHandler} />
    </SafeAreaView>
  );
};

export default PetScreen;
