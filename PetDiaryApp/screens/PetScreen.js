import { Button, Text, SafeAreaView } from "react-native";
import React from "react";
import DropdownMenu from "../components/DropdownMenu";

import { activitiesMenu } from "../constants";

const PetScreen = ({ navigation }) => {
  function pressHandler() {
    navigation.navigate("Add Log");
  }

  function selectHanlder(item) {
    console.log(item);
  }

  return (
    <SafeAreaView>
      <Text>Pet Screen</Text>
      <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder="🔍Search for activities"
        isSearching={true}
        selectHandler={selectHanlder}
      />
      <Button title="Navigate to Add" onPress={pressHandler} />
    </SafeAreaView>
  );
};

export default PetScreen;
