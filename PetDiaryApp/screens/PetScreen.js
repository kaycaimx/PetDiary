import { Button, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import DropdownMenu from "../components/DropdownMenu";

import { activitiesMenu } from "../constants";
import { styles } from "../styles";

const PetScreen = ({ navigation }) => {
  function pressHandler() {
    navigation.navigate("Add Log");
  }

  function selectHanlder(item) {
    console.log(item);
  }

  return (
    <SafeAreaView style={styles.container}>
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
