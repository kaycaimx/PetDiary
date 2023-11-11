import { StyleSheet } from "react-native";

const colors = {
  bottomTabIconFocused: "#e32f45",
  bottomTabIconUnfocused: "#748c94",
};

const styles = StyleSheet.create({
  bottomTabBarLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export { colors, styles };
