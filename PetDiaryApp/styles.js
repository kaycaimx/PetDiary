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
  buttonBackground: "#19204b",
  buttonText: "white",
  EntryListBackgroundColor: "white",
  EntryListTextColor: "#004C99",
};

const styles = StyleSheet.create({
  addButtonContainer: {
    backgroundColor: "red",
    position: "absolute",
    borderRadius: 50,
    bottom: -20,
  },
  addLogCheckbox: {
    marginRight: 10,
  },
  addLogCheckboxWrapper: {
    flexBasis: "45%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addPetWrapper: {
    marginTop: 10,
    width: "90%",
    marginBottom: 20,
  },
  addPetLabel: {
    color: colors.defaultTextColor,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  addPetInput: {
    width: "80%",
    backgroundColor: colors.inputBoxBackground,
    borderColor: colors.defaultTextColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  addPetCameraLabel: {
    fontSize: 12,
    color: colors.defaultTextColor,
    textAlign: "left",
  },
  addPetCameraWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  bigAddButton: {
    // from https://github.com/react-navigation/react-navigation/issues/5126
    position: "absolute",
    bottom: -10, // space from bottombar
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    backgroundColor: colors.bottomTabBackground,
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
  businessInfoColumnWrapper: {
    paddingHorizontal: 0,
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  businessInfoContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 40,
  },
  businessInfoRatingText: {
    fontSize: 13,
    color: colors.defaultTextColor,
    fontStyle: "italic",
    marginBottom: 3,
  },
  businessInfoTitleText: {
    color: colors.defaultTextColor,
    fontWeight: "bold",
    fontSize: 16,
  },
  businessInfoWrapper: {
    flexBasis: "45%",
    borderWidth: 1,
    borderColor: colors.backgroundColor,
    borderRadius: 10,
    paddingVertical: 8,
    margin: 4,
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    shadowColor: colors.logShadow,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        shadowOffset: {
          width: 4,
          height: 4,
        },
        elevation: 2,
      },
    }),
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
  iconWithTextPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWithTextPressableText: {
    color: colors.defaultTextColor,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    paddingLeft: 5,
  },
  iconWithTextPressed: {
    opacity: 0.5,
  },
  imageLabel: {
    fontSize: 15,
    color: colors.defaultTextColor,
    marginTop: 20,
    marginBottom: 10,
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
  logEntryImage: {
    width: 200,
    height: 200,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
    marginTop: 20,
  },
  loginImage: {
    width: 150,
    height: 150,
    marginBottom: 5,
    borderRadius: 75,
  },
  loginLabel: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.defaultTextColor,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.defaultTextColor,
    marginBottom: 5,
  },
  logListWrapper: {
    width: "90%",
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  mapButtonWrapper: {
    backgroundColor: colors.backgroundColor,
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingBottom: 20,
  },
  nameCheckboxWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  petProfileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.defaultTextColor,
  },
  petProfileScrollView: {
    width: "100%",
    alignContent: "center",
    marginTop: 5,
  },
  petProfileWrapper: {
    alignSelf: "center",
    width: "60%",
    backgroundColor: colors.bottomTabBackground,
    padding: 10,
    marginBottom: 20,
    borderRadius: 6,
    shadowColor: colors.logShadow,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        shadowOffset: {
          width: 4,
          height: 4,
        },
        elevation: 4,
      },
    }),
  },
  placeholderText: {
    fontSize: 20,
    color: colors.defaultTextColor,
    fontStyle: "italic",
    textAlign: "center",
    padding: 40,
  },
  profileLabel: {
    color: colors.defaultTextColor,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  searchBar: {
    width: "80%",
    backgroundColor: colors.inputBoxBackground,
    borderColor: colors.defaultTextColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  setNotificationWrapper: {
    marginTop: 20,
    width: "90%",
    marginBottom: 30,
  },
  setNotificationLabel: {
    color: colors.defaultTextColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  setNotificationInput: {
    height: 60,
    borderColor: colors.textInputBorderColor,
    backgroundColor: colors.textInputBackgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  setNotificationAndroidTimeInput: {
    width: "60%",
    backgroundColor: colors.inputBoxBackground,
    borderColor: colors.defaultTextColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 2,
    marginLeft: 10,
  },
  setNotificationButton: {
    backgroundColor: colors.buttonBackground,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
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
    paddingHorizontal: 15,
    backgroundColor: colors.backgroundColor,
  },
  alert: {
    color: colors.alertColor,
  },
  textInput: {
    height: 100,
    borderColor: colors.textInputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
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
  iconButton: {
    alignItems: "flex-end",
    padding: 10,
    marginHorizontal: 10,
  },
  EntryListContainer: {
    flexDirection: "row",
    backgroundColor: colors.EntryListBackgroundColor,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  EntryListText: {
    color: colors.EntryListTextColor,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  EntryListLogPressed: {
    backgroundColor: "#aaa",
    opacity: 0.5,
  },
  EntryListAdditionalArea: {
    backgroundColor: "white",
    padding: 5,
    marginRight: 10,
    margin: 5,
    flex: 1,
  },
  EntryListAdditionalText: {
    color: "black",
    fontSize: 16,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    color: colors.defaultTextColor,
  },
});

export { colors, styles };
