import {
  Alert,
  Button,
  KeyboardAvoidingView,
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

  const [petGender, setPetGender] = useState();
  const [petSpayed, setPetSpayed] = useState();

  const [petBirthday, setPetBirthday] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  function showDatePickerHandler() {
    setShowDatePicker(true);
  }

  const onChange = (event, selectedDate) => {
    const chosenDate = selectedDate;
    setPetBirthday(chosenDate);
    setDateSelected(true);
    setShowDatePicker(false);
  };

  function handleCancel() {
    setPetName("");
    setPetGender();
    setPetSpayed();
    setPetBirthday(new Date());
    navigation.navigate("Profile");
  }

  function validateInput() {
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
      petBirthday: petBirthday,
      petSpayed: petSpayed === "yes" ? true : false,
    };
    writePetToDB(newPet);
    handleCancel();
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
        <View style={styles.datePickerWrapper}>
          <TextInput
            style={styles.addPetInput}
            editable={false}
            placeholder="Select a date "
            value={dateSelected ? petBirthday.toLocaleDateString() : ""}
          />
          <PressableIcon pressHandler={showDatePickerHandler}>
            <Ionicons
              name="calendar-sharp"
              size={24}
              color={colors.defaultTextColor}
            />
          </PressableIcon>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={petBirthday}
            mode={"date"}
            onChange={onChange}
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
        <Text>📷Placeholder for camera</Text>
      </View>
      <View style={styles.buttonContainer}>
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
