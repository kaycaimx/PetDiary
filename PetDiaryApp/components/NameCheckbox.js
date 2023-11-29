import { View, Text } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

import { colors, styles } from "../styles";

const NameCheckbox = ({ petName, petID, isChecked, checkHandler }) => {
  return (
    <View style={styles.addLogCheckboxWrapper}>
      <Checkbox
        style={styles.addLogCheckbox}
        value={isChecked}
        onValueChange={() => checkHandler(petID)}
      />
      <Text style={{ color: colors.defaultTextColor }}>{petName}</Text>
    </View>
  );
};

export default NameCheckbox;
