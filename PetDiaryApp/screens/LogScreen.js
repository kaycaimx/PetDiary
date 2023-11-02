import { Button, View, Text } from "react-native";
import React from "react";

const LogScreen = ({ navigation }) => {
  function pressHandler() {
    navigation.navigate("Add Log");
  }

  return (
    <View>
      <Text>LogScreen</Text>
      <Button title="Test" onPress={pressHandler} />
    </View>
  );
};

export default LogScreen;
