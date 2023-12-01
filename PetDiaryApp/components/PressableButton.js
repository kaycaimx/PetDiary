import { Pressable, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  pressedStyle,
  defaultStyle,
  disabled,
}) {
  return (
    <View>
      <Pressable
        onPress={pressedFunction}
        style={({ pressed }) => {
          return [
            defaultStyle,
            pressed && pressedStyle,
            disabled && { opacity: 0.5 },
          ];
        }}
        disabled={disabled}
      >
        {children}
      </Pressable>
    </View>
  );
}
