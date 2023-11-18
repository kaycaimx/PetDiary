import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";

import PressableButton from "../components/PressableButton";
import PressableIcon from "../components/PressableIcon";
import { colors, styles } from "../styles";

import { writePetToDB } from "../firebase/firebasehelper";

const AddPetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [petGender, setPetGender] = useState();
  const [petSpayed, setPetSpayed] = useState();
  const [petBirthday, setPetBirthday] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [petAvatar, setPetAvatar] = useState(null);

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
    console.log(androidBirthdate);
    const birthdayRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (!birthdayRegex.test(androidBirthdate)) {
      Alert.alert("Please enter a valid date in YYYY-MM-DD format");
      return;
    }
    setPetBirthday(new Date(androidBirthdate));
  }

  function generateRandomAvatar() {
    const pokedex = [
      "001",
      "004",
      "007",
      "025",
      "035",
      "039",
      "054",
      "094",
      "090",
    ];
    let avatarURI = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
      pokedex[Math.floor(Math.random() * pokedex.length)]
    }.png`;
    setPetAvatar(avatarURI);
  }

  function clearAllInputs() {
    setPetName("");
    setPetGender();
    setPetSpayed();
    setPetBirthday(null);
    setPetAvatar(null);
  }

  function handleCancel() {
    clearAllInputs();
    navigation.goBack();
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
      // if petAvatar is null, use the default avatar pikachu
      petAvatar: petAvatar
        ? petAvatar
        : "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
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
        <Text style={styles.addPetLabel}>Pet Gender*</Text>
        <RadioGroup
          radioButtons={genderRadioButtons}
          onPress={setPetGender}
          selectedId={petGender}
          layout="row"
        />
        <Text style={styles.addPetLabel}>Pet Birthday*</Text>
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
        <Text style={styles.addPetLabel}>Neutered/Spayed*</Text>
        <RadioGroup
          radioButtons={spayedRadioButtons}
          onPress={setPetSpayed}
          selectedId={petSpayed}
          layout="row"
        />
        <Text style={styles.addPetLabel}>Pet Photo</Text>
        <Text>
          📷Placeholder for camera, press button below to generate random photo
        </Text>
        <Button title="Upload photo" onPress={generateRandomAvatar} />
      </View>
      <View style={[styles.buttonContainer, { width: "90%" }]}>
        <PressableButton
          pressedFunction={handleCancel}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={handleSavePet}
          defaultStyle={styles.button}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddPetScreen;
