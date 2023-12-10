import {
  Alert,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

import DropDownPicker from "react-native-dropdown-picker";
import PressableButton from "../components/PressableButton";
import { activitiesMenu } from "../constants";
import { styles } from "../styles";

const NotificationScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [androidNotificationTime, setAndroidNotificationTime] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || notificationTime;
    if (currentDate.getTime() < new Date().getTime()) {
      Alert.alert("Invalid Date", "Please choose a future date and time.");
      return;
    }
    setNotificationTime(currentDate);
  };

  function handleAndroidTime() {
    const datetimeRegex = /^\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}$/;
    if (!datetimeRegex.test(androidNotificationTime)) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid date in YYYY-MM-DD HH:mm format."
      );
      return;
    }
    const parsed = new Date(androidNotificationTime);
    if (!isNaN(parsed.getTime())) {
      if (parsed.getTime() < new Date().getTime()) {
        Alert.alert("Invalid Date", "Please enter a future date and time.");
        return;
      }
      setNotificationTime(parsed);
    } else {
      Alert.alert("Invalid Date", "Please enter a valid date.");
      return;
    }
  }

  async function verifyPermissions() {
    const status = await Notifications.getPermissionsAsync();
    if (status.granted) {
      return true;
    }
    const newStatus = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    return newStatus.granted;
  }

  async function setNotificationHandler() {
    if (!notificationType || !notificationContent) {
      Alert.alert("Invalid input", "Please enter activity type and content.");
      return;
    }

    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("Please give permission to send notification.");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationType,
          body: notificationContent,
        },
        trigger: {
          date: new Date(notificationTime),
        },
      });
      setNotificationType("");
      setNotificationContent("");
      setAndroidNotificationTime("");
      Alert.alert("Notification is set!", "Please choose what to do next.", [
        {
          text: "Set another reminder",
          onPress: () => {
            return;
          },
        },
        {
          text: "Go back to home",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (err) {
      console.log("schedule notification error:", err);
      Alert.alert("Something went wrong", "Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.setNotificationWrapper}>
        <Text style={styles.setNotificationLabel}>
          I need a reminder for: *{" "}
        </Text>
        <DropDownPicker
          containerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          open={open}
          items={activitiesMenu}
          setOpen={setOpen}
          value={notificationType}
          setValue={setNotificationType}
          searchable={true}
          placeholder="Select an activity"
          placeholderStyle={styles.dropdownPlaceholder}
          onSelectItem={(item) => {
            setNotificationType(item.label);
          }}
        />
        <Text style={styles.setNotificationLabel}>Reminder content: *</Text>
        <TextInput
          style={styles.setNotificationInput}
          placeholder="Content"
          value={notificationContent}
          onChangeText={(text) => setNotificationContent(text)}
        />
        {Platform.OS === "ios" ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.setNotificationLabel, { paddingTop: 8 }]}>
              Remind me on: *
            </Text>
            <DateTimePicker
              value={notificationTime}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.setNotificationLabel, { paddingTop: 8 }]}>
              Remind me on: *
            </Text>
            <TextInput
              style={styles.setNotificationAndroidTimeInput}
              placeholder="YYYY-MM-DD HH:mm"
              value={androidNotificationTime}
              setValue={setAndroidNotificationTime}
              onChangeText={setAndroidNotificationTime}
              onSubmitEditing={handleAndroidTime}
            />
          </View>
        )}
      </View>
      <PressableButton
        pressedFunction={setNotificationHandler}
        defaultStyle={styles.setNotificationButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <Text style={styles.buttonText}>Set Notification</Text>
      </PressableButton>
    </SafeAreaView>
  );
};

export default NotificationScreen;
