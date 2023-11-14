import { StyleSheet } from "react-native";

const colors = {
  backgroundColor: "#e9efea",
  defaultTextColor: "#19204b",
  bottomTabIconFocused: "#19204b",
  bottomTabIconUnfocused: "#abaeb6",
  dropdownPlaceholder: "gray",
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
    backgroundColor: colors.defaultTextColor},
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
  },
  EntryListAdditionalText: {
    color: "black",
  },
});

export { colors, styles };
