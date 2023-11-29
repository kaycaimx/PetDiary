import { Image } from "react-native";
import React, { useState, useEffect } from "react";

import { styles } from "../styles";
import { storage } from "../firebase/firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";

const PetAvatar = ({ focused, avatarURI }) => {
  const pikachuAvatar =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png";
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function downloadAvatar() {
      const avatarRef = ref(storage, avatarURI);
      const avatarURL = await getDownloadURL(avatarRef);
      setAvatar(avatarURL);
    }
    // if petAvatar is null, use the default avatar pikachu
    if (avatarURI) {
      downloadAvatar();
    } else {
      setAvatar(pikachuAvatar);
    }
  }, []);

  return (
    <Image
      style={[styles.petAvatar, !focused && styles.petAvatarUnfocused]}
      source={{ uri: avatar }}
    />
  );
};

export default PetAvatar;
