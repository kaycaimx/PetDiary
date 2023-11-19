import {
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import { writeLogToDB } from "../firebase/firebasehelper";
import { styles } from "../styles";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

import { activitiesMenu } from "../constants";
import DropDownPicker from "react-native-dropdown-picker";

const AddLogScreen = ({ navigation }) => {
  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    // At Iteration 1, we are not using firebase authentication yet, so we are
    // hardcoding the user to "testUser".
    const q = collection(database, "PetDiary", "testUser", "pets");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        let pets = [];
        querySnapshot.forEach((doc) => {
          pets.push({ ...doc.data(), id: doc.id });
        });
        setMyPets(pets);
      } else {
        setMyPets([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(false);
  const [location, setLocation] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(activitiesMenu);

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
      handleCancel();
    }
  };

  const handleCancel = () => {
    // Use navigation.goBack() to return to the previous screen
    setType("");
    setContent("");
    navigation.navigate("Log");
  };

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.view} behavior="padding">
      <Text>Select pets: </Text>
      {myPets && myPets.map((pet) => <Text key={pet.id}>{pet.petName}</Text>)}
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

      <Text>📷 Add photo</Text>
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
