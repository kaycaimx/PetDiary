import { Alert, SafeAreaView, Text, TextInput } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

import DropdownMenu from "../components/DropdownMenu";
import PressableButton from "../components/PressableButton";
import { activitiesMenu } from "../constants";
import { styles } from "../styles";

const NotificationScreen = () => {
  const [notificationType, setNotificationType] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationTime, setNotificationTime] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || notificationTime;
    if (currentDate.getTime() < new Date().getTime()) {
      Alert.alert("Invalid Date", "Please choose a future date and time.");
      return;
    }
    setNotificationTime(currentDate);
  };

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
      Alert.alert(
        "Invalid input",
        "Please enter notification type and content."
      );
      return;
    }
    if (data)
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
      } catch (err) {
        console.log("schedule notification error:", err);
      }
  }

  function selectHanlder(search) {
    setNotificationType(search["label"]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>NotificationScreen</Text>
      <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder="I need to remind myself to..."
        value={notificationType}
        isSearching={true}
        selectHandler={selectHanlder}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Content"
        value={notificationContent}
        onChangeText={(text) => setNotificationContent(text)}
      />
      <DateTimePicker
        value={notificationTime}
        mode="datetime" // "datetime" mode includes both date and time
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
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
