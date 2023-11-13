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
    width: "100%",
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
  petAvatar: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  petAvatarUnfocused: {
    opacity: 0.5,
  },
  topTabBar: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 40,
  },

  topTabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
  },
  topTabBarIndicator: {
    backgroundColor: colors.defaultTextColor,
  },
});

export { colors, styles };
