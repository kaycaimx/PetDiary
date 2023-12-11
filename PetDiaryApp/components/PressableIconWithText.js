import { Pressable } from "react-native";
import React from "react";

import { styles } from "../styles";

const PressableIconWithText = ({ children, pressHandler }) => {
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => {
        return [
          styles.iconWithTextPressable,
          pressed && styles.iconWithTextPressed,
        ];
      }}
      android_ripple={styles.androidRipple}
    >
      {children}
    </Pressable>
  );
};

export default PressableIconWithText;
