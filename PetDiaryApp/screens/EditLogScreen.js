import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";
import CustomTextInput from "../components/TextInput";
import { colors, styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { database } from "../firebase/firebaseSetup";
import { useAuth } from "../components/AuthContext";

import { activitiesMenu } from "../constants";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

const EditLogScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { logToEdit } = route.params;
  const [type, setType] = useState(logToEdit.type);
  const [content, setContent] = useState(logToEdit.content);
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(activitiesMenu);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
                user,
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
              user,
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

  const mockData = [
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
  ];

  return (
    <SafeAreaView style={styles.view}>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View>
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
            setItems={setItems}
            multiple={false}
          />
          <CustomTextInput
            placeholder="Add details ..."
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: 200, height: 200, marginHorizontal: 5 }}
          />
        )}
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
      />
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
    </SafeAreaView>
  );
};

export default EditLogScreen;
