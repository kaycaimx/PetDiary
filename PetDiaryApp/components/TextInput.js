import { TextInput } from "react-native";
import React from "react";
import { colors, styles } from "../styles";

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={[styles.textInput, { backgroundColor: colors.textInputBackgroundColor }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={true}
    />
  );
};

export default CustomTextInput;
