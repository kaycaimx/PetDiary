import { View, Text, Alert, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import DropdownMenu from "../components/DropdownMenu";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { database } from "../firebase/firebaseSetup";

import { activitiesMenu } from "../constants";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

const EditLogScreen = ({ route, navigation }) => {
  const { logs } = route.params;
  const [type, setType] = useState(logs.type);
  const [content, setContent] = useState(logs.content);
  const [photo, setPhoto] = useState(logs.photo);
  const [location, setLocation] = useState(logs.location);

  function selectTypeHanlder(type) {
    console.log(type);
    setType(type);
  }

  const handleUpdateLog = async () => {
    if (!type || !content) {
      Alert.alert("Invalid input", "Please enter your input.");
    } else {
      const log = {
        type: type["label"],
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
              const logRef = doc(database, "logs", logs.id);
              navigation.goBack();
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
            const logRef = doc(database, "logs", logs.id);
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
        >
          <Ionicons name="trash" size={24} color="#004C99" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.alert}>* required</Text>
      <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder={type}
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
          pressedFunction={handleUpdateLog}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
};

export default EditLogScreen;
