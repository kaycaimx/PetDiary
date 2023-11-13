import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import DropdownMenu from "../components/DropdownMenu";
import { writeLogToDB } from "../firebase/firebasehelper";
import { styles } from "../styles";

import { activitiesMenu } from "../constants";

const AddLogScreen = ({ navigation }) => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(false);
  const [location, setLocation] = useState(false);

  function selectTypeHanlder(type) {
    console.log(type);
    setType(type);
  }

  const handleSaveLog = () => {
    if (!type || !content) {
      Alert.alert("Invalid input", "Please enter your input.");
    } else {
      const log = {
        type: type,
        content: content,
        // photo: photo,
        // location: location,
      };
      writeLogToDB(log);
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    // Use navigation.goBack() to return to the previous screen
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.alert}>* required</Text>
      <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder="🔍 Select activity type"
        selectHandler={selectTypeHanlder}
      />
      <CustomTextInput
        placeholder="Add details ..."
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Text>Add photo</Text>
      <Text>📍 Add location</Text>
      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={handleCancel}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={handleSaveLog}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
};

export default AddLogScreen;
