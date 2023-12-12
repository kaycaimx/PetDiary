import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
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
import { getImageFromDB } from "../firebase/firebasehelper";
import DropDownPicker from "react-native-dropdown-picker";

const EditLogScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { logToEdit } = route.params;
  const [type, setType] = useState(logToEdit.type);
  const [content, setContent] = useState(logToEdit.content);
  const [images, setImages] = useState(logToEdit.images);
  const [preview, setPreview] = useState([]);
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
        images: images,
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

  useEffect(() => {
    async function downloadImage() {
      for (let i = 0; i < images.length; i++) {
        const response = await getImageFromDB(images[i]);
        setPreview((preview) => [...preview, response]);
      }
    }
    downloadImage();
  }, []);

  function imagePressHandler(image) {
    Alert.alert("Important", "Are you sure you want to delete this image?", [
      {
        text: "No",
        style: "cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Yes",
        onPress: () => {
          deleteImage(image);
        },
      },
    ]);
  }

  function deleteImage(image) {
    const index = preview.indexOf(image);
    setPreview((preview) => preview.filter((_, i) => i !== index));
    setImages((images) => images.filter((_, i) => i !== index));
  }

  return (
    <KeyboardAvoidingView style={styles.view}>
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
            placeholder="Add details ... *"
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </TouchableWithoutFeedback>

      {preview.length !== 0 && (
        <>
          <Text style={styles.imageLabel}>Press an image to delete it:</Text>
          <FlatList
            data={preview}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => {
                  return { opacity: pressed ? 0.5 : 1 };
                }}
                onPress={() => imagePressHandler(item)}
              >
                <Image source={{ uri: item }} style={styles.logEntryImage} />
              </Pressable>
            )}
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </>
      )}
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
