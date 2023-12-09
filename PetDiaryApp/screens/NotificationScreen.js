import { Alert, SafeAreaView, Text } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

import PressableButton from "../components/PressableButton";
import { styles } from "../styles";

const NotificationScreen = () => {
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
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("Please give permission to send notification.");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Pet Diary",
          body: "It's time to add log for your pet!",
        },
        trigger: {
          seconds: 5,
        },
      });
    } catch (err) {
      console.log("schedule notification error:", err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>NotificationScreen</Text>
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
