import {
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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
    console.log(type["label"]);
    setType(type);
  }

  const handleSaveLog = () => {
    if (!type || !content) {
      Alert.alert("Invalid input", "Please enter your input.");
    } else {
      const log = {
        type: type["label"],
        content: content,
        // photo: photo,
        // location: location,
      };
      writeLogToDB(log);
      handleCancel();
    }
  };

  const handleCancel = () => {
    // Use navigation.goBack() to return to the previous screen
    setType("");
    setContent("");
    navigation.goBack();
  };

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.view} behavior="padding">
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
    </KeyboardAvoidingView>
  );
};

export default AddLogScreen;
