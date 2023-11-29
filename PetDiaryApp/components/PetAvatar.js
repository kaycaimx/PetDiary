import { Image } from "react-native";
import React, { useState, useEffect } from "react";

import { styles } from "../styles";
import { getAvatarFromDB } from "../firebase/firebasehelper";

const PetAvatar = ({ focused, avatarURI }) => {
  const pikachuAvatar =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png";
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function downloadAvatar() {
      if (avatarURI) {
        const response = await getAvatarFromDB(avatarURI);
        setAvatar(response);
      } else {
        // if petAvatar is null, use the default avatar pikachu
        setAvatar(pikachuAvatar);
      }
    }
    downloadAvatar();
  }, []);

  return (
    <Image
      style={[styles.petAvatar, !focused && styles.petAvatarUnfocused]}
      source={{ uri: avatar }}
    />
  );
};

export default PetAvatar;
