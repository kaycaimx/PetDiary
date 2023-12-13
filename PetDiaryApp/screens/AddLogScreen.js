import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import PressableButton from "../components/PressableButton";
import PressableIcon from "../components/PressableIcon";
import CustomTextInput from "../components/TextInput";
import NameCheckbox from "../components/NameCheckbox";
import { storage } from "../firebase/firebaseSetup";
import { uploadBytesResumable, ref } from "firebase/storage";
import { writeLogToDB } from "../firebase/firebasehelper";
import { colors, styles } from "../styles";
import { activitiesMenu } from "../constants";
import { useAuth } from "../components/AuthContext";
import { usePets } from "../components/PetsContext";
import DropDownPicker from "react-native-dropdown-picker";

const AddLogScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { myPets } = usePets();

  const [petsHaveLog, setPetsHaveLog] = useState(myPets);
  //console.log("myPest", myPets);

  const returnForNoPets = () => {
    if (myPets.length === 0) {
      Alert.alert("You don't have any pet", "Please add a pet first.");
      navigation.navigate("Add pet");
    }
  };

  useEffect(() => {
    if (myPets.length === 0) {
      Alert.alert("You don't have any pet", "Please add a pet first.");
      navigation.navigate("Add pet");
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     returnForNoPets();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  // same approach as in AddPetScreen, using two states to fix the latency issue
  // but here we need to keep track of the number of images uploaded
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isSelectingFromAlbum, setIsSelectingFromAlbum] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(activitiesMenu);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  async function verifyCameraPermission() {
    if (cameraStatus.granted) {
      return true;
    }
    const response = await requestCameraPermission();
    return response.granted;
  }

  async function verifyMediaPermission() {
    if (mediaStatus.granted) {
      return true;
    }
    const response = await requestMediaPermission();
    return response.granted;
  }

  async function takePhoto() {
    try {
      const permissionGranted = await verifyCameraPermission();
      if (!permissionGranted) {
        Alert.alert("Please enable camera permissions in settings.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setIsTakingPhoto(true);
        setPreview([...preview, result.assets[0].uri]);
        uploadImageToFirebase(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Take photo error:", error);
    }
  }

  async function selectFromAlbum() {
    try {
      const permissionGranted = await verifyMediaPermission();
      if (!permissionGranted) {
        Alert.alert("Please enable access to your photo album in settings.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setIsSelectingFromAlbum(true);
        setPreview([...preview, result.assets[0].uri]);
        uploadImageToFirebase(result.assets[0].uri);
        console.log("selectfunction", result.assets[0].uri);
      }
    } catch (error) {
      console.log("Select from album error:", error);
    }
  }

  async function uploadImageToFirebase(imageURI) {
    try {
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const imageName = imageURI.substring(imageURI.lastIndexOf("/") + 1);
      const storageRef = await ref(storage, `images/${imageName}`);
      const uploadTask = await uploadBytesResumable(storageRef, blob);
      setImageCount((prevCount) => prevCount + 1);

      setImages([...images, uploadTask.metadata.fullPath]);
    } catch (error) {
      console.log("Upload photo to Firebase error:", error);
    }
  }

  const handleSaveLog = () => {
    let pets = [...petsHaveLog];
    pets = pets.filter((pet) => pet.isChecked);
    if (pets.length === 0) {
      Alert.alert(
        "You haven't selected any pet",
        "Please select one or more pets to add log or please add a pet."
      );
      return;
    }
    if (!type) {
      Alert.alert("Invalid input", "You must select an activity type.");
    } else {
      const log = {
        type: type,
        content: content,
        images: images,
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
    setType("");
    setContent("");
    setImageCount(0);
    setImages([]);
    setPreview([]);
    setIsSelectingFromAlbum(false);
    setIsTakingPhoto(false);
    navigation.navigate("Log");
  };

  const handleCheckbox = (id) => {
    let pets = [...myPets];
    let pet = pets.find((pet) => pet.id === id);
    pet.isChecked = !pet.isChecked;
    setPetsHaveLog(pets);
  };

  return (
    <KeyboardAvoidingView style={styles.view} behavior="padding">
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View>
          <Text style={styles.addPetLabel}>Select pets *: </Text>
          {myPets && (
            <View style={styles.nameCheckboxWrapper}>
              {myPets.map((pet) => (
                <NameCheckbox
                  key={pet.id}
                  petName={pet.petName}
                  petID={pet.id}
                  isChecked={pet.isChecked}
                  checkHandler={handleCheckbox}
                />
              ))}
            </View>
          )}
          <Text style={styles.alert}>*activity type is required</Text>
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
            placeholder="Add details..."
            value={content}
            onChangeText={(text) => setContent(text)}
          />

          <Text style={styles.addPetLabel}>Add photos: </Text>
          <View style={styles.addPetCameraWrapper}>
            <View>
              <PressableIcon pressHandler={takePhoto}>
                <Ionicons
                  name="camera"
                  size={28}
                  color={colors.defaultTextColor}
                />
                <Text style={styles.addPetCameraLabel}>Take a photo</Text>
              </PressableIcon>
            </View>
            <View>
              <PressableIcon pressHandler={selectFromAlbum}>
                <MaterialIcons
                  name="photo-library"
                  size={28}
                  color={colors.defaultTextColor}
                />
                <Text style={styles.addPetCameraLabel}>Upload from album</Text>
              </PressableIcon>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {preview.length !== 0 && (
        <FlatList
          data={preview}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.logEntryImage} />
          )}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1 }}
        />
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
          pressedFunction={handleSaveLog}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
          disabled={
            isTakingPhoto || isSelectingFromAlbum
              ? images.length !== imageCount
              : images.length !== 0
          }
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddLogScreen;
