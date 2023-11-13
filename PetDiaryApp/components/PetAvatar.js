import { Image } from "react-native";
import React from "react";

import { styles } from "../styles";

const PetAvatar = ({ focused, avatarURI }) => {
  return (
    <Image
      style={[styles.petAvatar, !focused && styles.petAvatarUnfocused]}
      source={{ uri: avatarURI }}
    />
  );
};

export default PetAvatar;
