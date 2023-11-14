import { Pressable } from "react-native";
import React from "react";

import { styles } from "../styles";

const PressableIcon = ({ children, pressHandler }) => {
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => {
        return [styles.iconDefault, pressed && styles.iconPressed];
      }}
      android_ripple={styles.androidRipple}
    >
      {children}
    </Pressable>
  );
};

export default PressableIcon;
