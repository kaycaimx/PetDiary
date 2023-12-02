import { View, Text, Alert, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import { colors, styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { database } from "../firebase/firebaseSetup";

import { activitiesMenu } from "../constants";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

const EditLogScreen = ({ route, navigation }) => {
  const { logToEdit } = route.params;
  const [type, setType] = useState(logToEdit.type);
  const [content, setContent] = useState(logToEdit.content);
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(activitiesMenu);

  function selectTypeHanlder(type) {
    console.log(type);
    setType(type);
  }

  const handleUpdateLog = async () => {
    if (!type || !content) {
      Alert.alert("Invalid input", "Please enter your input.");
    } else {
      const log = {
        type: type,
        content: content,
        // photo: photo,
        // location: location,
      };
      Alert.alert("Important", "Are you sure you want to save these changes?", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const logRef = doc(
                database,
                "PetDiary",
                "testUser",
                "pets",
                logToEdit.petDoc,
                "logs",
                logToEdit.id
              );
              await updateDoc(logRef, log);
              navigation.goBack();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
    }
  };

  const handleDeleteLog = async () => {
    Alert.alert("Important", "Are you sure you want to delete this log?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            // Perform the deletion action
            const logRef = doc(
              database,
              "PetDiary",
              "testUser",
              "pets",
              logToEdit.petDoc,
              "logs",
              logToEdit.id
            );
            await deleteDoc(logRef);
            navigation.goBack();
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    // Use navigation.goBack() to return to the previous screen
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedFunction={handleDeleteLog}
          defaultStyle={styles.iconButton}
          pressedStyle={styles.buttonPressed}
          disabled={false}
        >
          <Ionicons
            name="trash-bin"
            size={24}
            color={colors.defaultTextColor}
          />
        </PressableButton>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={styles.view}>
      <Text style={styles.alert}>* required</Text>
      {/* <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder={type}
        value={type}
        selectHandler={selectTypeHanlder}
      /> */}
      <DropDownPicker
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        open={open}
        items={items}
        setOpen={setOpen}
        value={type}
        setValue={setType}
        searchable={true}
        setItems={setItems}
        multiple={false}
      />
      <CustomTextInput
        placeholder="Add details ..."
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Text>Edit photo placeholder</Text>
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
          pressedFunction={handleUpdateLog}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
          disabled={false}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditLogScreen;
