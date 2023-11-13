import { Platform, StyleSheet } from "react-native";

const colors = {
  avatarBorderColor: "#19204b",
  backgroundColor: "#e9efea",
  bottomTabIconFocused: "#19204b",
  bottomTabIconUnfocused: "#abaeb6",
  defaultTextColor: "#19204b",
  dropdownPlaceholder: "gray",
  iconDefault: "#323b70",
  iconPressed: "#caedd0",
  logShadow: "#babfbb",
  textInputBackgroundColor: "white",
  alertColor: "red",
  buttonBackground: "#004C99",
  buttonText: "white",
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
  homeScreenHeader: {
    height: 80,
    backgroundColor: colors.backgroundColor,
  },
  iconDefault: {
    backgroundColor: colors.backgroundColor,
    marginTop: 10,
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
