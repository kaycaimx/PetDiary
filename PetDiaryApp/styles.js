import { Platform, StyleSheet } from "react-native";

const colors = {
  avatarBorderColor: "#19204b",
  backgroundColor: "#e9efea",
  bottomTabBackground: "#d1d7d2",
  bottomTabIconFocused: "#19204b",
  bottomTabIconUnfocused: "#abaeb6",
  defaultTextColor: "#19204b",
  dropdownPlaceholder: "gray",
  iconDefault: "#323b70",
  iconPressed: "#caedd0",
  inputBoxBackground: "#fff",
  logShadow: "#babfbb",
  textInputBackgroundColor: "white",
  alertColor: "red",
  buttonBackground: "#004C99",
  buttonText: "white",
};

const styles = StyleSheet.create({
  bigAddButton: {
    // from https://github.com/react-navigation/react-navigation/issues/5126
    position: "absolute",
    bottom: -10, // space from bottombar
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabBar: {
    backgroundColor: colors.bottomTabBackground,
    borderTopWidth: 1,
    position: "relative",
  },
  bottomTabBarLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
  addButtonContainer: {
    backgroundColor: "red",
    position: "absolute",
    borderRadius: 50,
    bottom: -20,
  },
  addPetWrapper: {
    marginTop: 10,
    width: "90%",
    marginBottom: 20,
  },
  addPetLabel: {
    color: colors.headerFooter,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  addPetInput: {
    width: "100%",
    backgroundColor: colors.inputBoxBackground,
    borderColor: colors.defaultTextColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
  },
  datePickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
    height: 50,
  },
  dropdownPlaceholder: {
    color: colors.dropdownPlaceholder,
  },
  dropdownText: {
    color: colors.defaultTextColor,
  },
  homeScreenHeader: {
    height: 90,
    backgroundColor: colors.backgroundColor,
  },
  homeScreenHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.defaultTextColor,
  },
  iconDefault: {
    backgroundColor: colors.backgroundColor,
    marginRight: 20,
    marginLeft: 20,
  },
  iconPressed: {
    backgroundColor: colors.iconPressed,
    opacity: 0.5,
  },
  logEntryWrapperDefault: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: colors.backgroundColor,
    shadowColor: colors.logShadow,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        shadowOffset: {
          width: 2,
          height: 2,
        },
        elevation: 2,
      },
    }),
  },
  logEntryWrapperPressed: {
    opacity: 0.5,
  },
  logEntryType: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.defaultTextColor,
  },
  logEntryTime: {
    fontStyle: "italic",
    color: colors.defaultTextColor,
  },
  logListWrapper: {
    width: "90%",
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  petAvatar: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.defaultTextColor,
  },
  petAvatarUnfocused: {
    opacity: 0.5,
    borderWidth: 0,
  },
  topTabBar: {
    backgroundColor: colors.backgroundColor,
  },

  topTabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 12,
    paddingLeft: 10,
  },
  topTabBarIndicator: {
    backgroundColor: colors.defaultTextColor,
  },
  view: {
    margin: 15,
    marginTop: 30,
  },
  alert: {
    color: colors.alertColor,
  },
  textInput: {
    height: 200,
    borderColor: colors.textInputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 100,
  },
  buttonText: {
    color: colors.buttonText,
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.6,
  },
});

export { colors, styles };
