import { Image } from "react-native";
import React from "react";
import { styles } from "../styles";

const AddPetIcon = ({ focused }) => {
  return (
    <Image
      source={require("../assets/addPet.png")}
      style={[styles.petAvatar, !focused && styles.petAvatarUnfocused]}
    />
  );
};

export default AddPetIcon;
