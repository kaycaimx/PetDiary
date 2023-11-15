import { Pressable, View, Text } from "react-native";
import React from "react";

import { colors, styles } from "../styles";

const LogEntry = ({ navigation, entry }) => {
  const { id, content, createdAt, type } = entry;
  //console.log(id);

  function convertTimestamp(timestamp) {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return "Error to show time";
  }

  function logPressHandler() {
    navigation.navigate("Edit Log", { logToEdit: entry });
  }

  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.logEntryWrapperDefault,
          pressed && styles.logEntryWrapperPressed,
        ];
      }}
      onPress={logPressHandler}
    >
      <Text style={styles.logEntryType}>{type}</Text>
      <Text style={styles.logEntryTime}>{convertTimestamp(createdAt)}</Text>
    </Pressable>
  );
};

export default LogEntry;
