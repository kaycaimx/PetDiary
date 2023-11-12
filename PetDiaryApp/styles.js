import { StyleSheet } from "react-native";

const colors = {
  backgroundColor: "#F1f5ee",
  defaultTextColor: "#19204b",
  bottomTabIconFocused: "#19204b",
  bottomTabIconUnfocused: "#abaeb6",
};

const styles = StyleSheet.create({
  bottomTabBarLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
  },
});

export { colors, styles };
