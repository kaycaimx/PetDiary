import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import PressableButton from "../components/PressableButton";
import PressableIcon from "../components/PressableIcon";
import { colors, styles } from "../styles";

import { storage } from "../firebase/firebaseSetup";
import { uploadBytesResumable, ref } from "firebase/storage";
import { writePetToDB } from "../firebase/firebasehelper";

const AddPetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [petGender, setPetGender] = useState();
  const [petSpayed, setPetSpayed] = useState();
  const [petBirthday, setPetBirthday] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [petAvatar, setPetAvatar] = useState(null);

  // Use separate state variables for taking photo and selecting from album to fix the latency issue
  // If user takes a photo or selects a photo from album, and does not cancel the action,
  // the Save button will be disabled until the photo is uploaded to Firebase and path is saved to petAvatar
  // Otherwise, if the user does not take a photo or select a photo from album, and the petAvatar is null,
  // the Save button will not be disabled => logic in lines 314-319
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isSelectingFromAlbum, setIsSelectingFromAlbum] = useState(false);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const genderRadioButtons = useMemo(
    () => [
      {
        id: "female", // acts as primary key, should be unique and non-empty string
        label: "Female",
        value: "female",
      },
      {
        id: "male",
        label: "Male",
        value: "male",
      },
    ],
    []
  );

  const spayedRadioButtons = useMemo(
    () => [
      {
        id: "yes",
        label: "Yes",
        value: "yes",
      },
      {
        id: "no",
        label: "No",
        value: "no",
      },
    ],
    []
  );

  // due to a bug in react-native-datetimepicker, we need to use a separate
  // state variable for the android date picker
  const [androidBirthdate, setAndroidBirthdate] = useState("");

  function showDatePickerHandler() {
    setShowDatePicker(true);
  }

  const onChange = (event, selectedDate) => {
    const chosenDate = selectedDate;
    setPetBirthday(chosenDate);
    setShowDatePicker(false);
  };

  function handleAndroidBirthdateChange() {
    //console.log(androidBirthdate);
    const birthdayRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (!birthdayRegex.test(androidBirthdate)) {
      Alert.alert("Please enter a valid date in YYYY-MM-DD format");
      return;
    }
    if (!Date.parse(androidBirthdate)) {
      Alert.alert(`${androidBirthdate} is not a valid date`);
      return;
    }
    const day = Date.parse(androidBirthdate);
    setPetBirthday(new Date(day));
  }

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
        uploadImageToFirebase(result.assets[0].uri);
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
      setPetAvatar(uploadTask.metadata.fullPath);
    } catch (error) {
      console.log("Upload photo to Firebase error:", error);
    }
  }

  function clearAllInputs() {
    setPetName("");
    setPetGender();
    setPetSpayed();
    setPetBirthday(null);
    setPetAvatar(null);
    setIsTakingPhoto(false);
    setIsSelectingFromAlbum(false);
  }

  function handleCancel() {
    clearAllInputs();
    navigation.navigate("Home");
  }

  function validateInput() {
    if (Platform.OS === "android" && !petBirthday) {
      handleAndroidBirthdateChange();
    }
    if (!petName || !petGender || !petBirthday || !petSpayed) {
      Alert.alert("Please fill out all required fields");
      return false;
    }
    return true;
  }

  function handleSavePet() {
    if (!validateInput()) {
      return;
    }
    const newPet = {
      petName: petName,
      petGender: petGender,
      petBirthday: petBirthday.toLocaleDateString(),
      petSpayed: petSpayed === "yes" ? true : false,
      petAvatar: petAvatar,
    };
    writePetToDB(newPet);
    clearAllInputs();
    navigation.navigate("Profile");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.addPetWrapper}>
        <Text style={styles.addPetLabel}>Pet Name *</Text>
        <TextInput
          style={styles.addPetInput}
          value={petName}
          onChangeText={(text) => setPetName(text)}
        />
        <Text style={styles.addPetLabel}>Pet Gender *</Text>
        <RadioGroup
          radioButtons={genderRadioButtons}
          onPress={setPetGender}
          selectedId={petGender}
          layout="row"
        />
        <Text style={styles.addPetLabel}>Pet Birthday *</Text>
        {Platform.OS === "ios" && (
          <View style={styles.datePickerWrapper}>
            <TextInput
              style={styles.addPetInput}
              editable={false}
              placeholder="Select a date "
              value={petBirthday ? petBirthday.toLocaleDateString() : ""}
            />

            <PressableIcon pressHandler={showDatePickerHandler}>
              <Ionicons
                name="calendar-sharp"
                size={24}
                color={colors.defaultTextColor}
              />
            </PressableIcon>
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"date"}
            onChange={onChange}
          />
        )}

        {Platform.OS === "android" && (
          <TextInput
            style={styles.addPetInput}
            placeholder="YYYY-MM-DD"
            onChangeText={setAndroidBirthdate}
            onSubmitEditing={handleAndroidBirthdateChange}
          />
        )}
        <Text style={styles.addPetLabel}>Neutered/Spayed *</Text>
        <RadioGroup
          radioButtons={spayedRadioButtons}
          onPress={setPetSpayed}
          selectedId={petSpayed}
          layout="row"
        />
        <Text style={styles.addPetLabel}>Pet Photo</Text>
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
      <View style={[styles.buttonContainer, { width: "90%" }]}>
        <PressableButton
          pressedFunction={handleCancel}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
          disabled={false}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={handleSavePet}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
          disabled={
            isTakingPhoto || isSelectingFromAlbum
              ? petAvatar === null
              : petAvatar !== null
          }
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddPetScreen;
