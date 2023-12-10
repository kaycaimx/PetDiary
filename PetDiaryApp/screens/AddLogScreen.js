import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import NameCheckbox from "../components/NameCheckbox";
import { writeLogToDB } from "../firebase/firebasehelper";
import { styles } from "../styles";

import { activitiesMenu } from "../constants";
import { useAuth } from "../components/AuthContext";
import { usePets } from "../components/PetsContext";
import DropDownPicker from "react-native-dropdown-picker";

const AddLogScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { myPets } = usePets();

  const [petsHaveLog, setPetsHaveLog] = useState(myPets);

  const returnForNoPets = () => {
    if (myPets.length === 0) {
      Alert.alert("You don't have any pet", "Please add a pet first.");
      navigation.navigate("Add pet");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      returnForNoPets();
    });
    return unsubscribe;
  }, [navigation]);

  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(false);
  const [location, setLocation] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(activitiesMenu);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSaveLog = () => {
    let pets = [...petsHaveLog];
    if (pets.length === 0) {
      Alert.alert(
        "You haven't selected any pet",
        "Please select one or more pets to add log or please add a pet."
      );
      return;
    }
    if (!type || !content) {
      Alert.alert("Invalid input", "Please enter your input.");
    } else {
      const log = {
        type: type,
        content: content,
        // photo: photo,
        // location: location,
      };
      while (pets.length > 0) {
        let pet = pets.pop();
        if (pet.isChecked) {
          writeLogToDB(user, pet.id, log);
        }
      }
      handleCancel();
    }
  };

  const handleCancel = () => {
    // Use navigation.goBack() to return to the previous screen
    setType("");
    setContent("");
    navigation.navigate("Log");
  };

  const handleCheckbox = (id) => {
    let pets = [...myPets];
    let pet = pets.find((pet) => pet.id === id);
    pet.isChecked = !pet.isChecked;
    setPetsHaveLog(pets);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView style={styles.view} behavior="padding">
        <Text style={styles.addPetLabel}>Select pets *: </Text>
        {myPets &&
          myPets.map((pet) => (
            <NameCheckbox
              key={pet.id}
              petName={pet.petName}
              petID={pet.id}
              isChecked={pet.isChecked}
              checkHandler={handleCheckbox}
            />
          ))}
        <Text style={styles.alert}>* required</Text>
        <DropDownPicker
          containerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          open={open}
          items={items}
          setOpen={setOpen}
          value={type}
          setValue={setType}
          searchable={true}
          placeholder="🔍 Select activity type"
          placeholderStyle={styles.dropdownPlaceholder}
          setItems={setItems}
          multiple={false}
        />
        <CustomTextInput
          placeholder="Add details ..."
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <Text>📷 Add photo placeholder</Text>
        {/* <Text>📍 Add location</Text> */}
        <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={handleCancel}
            defaultStyle={styles.button}
            pressedStyle={styles.buttonPressed}
            disabled={false}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={handleSaveLog}
            defaultStyle={styles.button}
            pressedStyle={styles.buttonPressed}
            disabled={false}
          >
            <Text style={styles.buttonText}>Save</Text>
          </PressableButton>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddLogScreen;
