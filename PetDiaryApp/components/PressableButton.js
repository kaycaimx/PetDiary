import { Pressable, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  pressedStyle,
  defaultStyle,
}) {
  return (
    <View>
      <Pressable
        onPress={pressedFunction}
        style={({ pressed }) => {
          return [defaultStyle, pressed && pressedStyle];
        }}
      >
        {children}
      </Pressable>
    </View>
  );
}
