import { StyleSheet } from "react-native";

const colors = {
  backgroundColor: "#e9efea",
  defaultTextColor: "#19204b",
  bottomTabIconFocused: "#19204b",
  bottomTabIconUnfocused: "#abaeb6",
  dropdownPlaceholder: "gray",
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
  dropdownContainer: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    height: 50,
  },
  dropdownPlaceholder: {
    color: colors.dropdownPlaceholder,
  },
  dropdownText: {
    color: colors.defaultTextColor,
  },
});

export { colors, styles };
