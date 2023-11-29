import { Image, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import { colors, styles } from "../styles";
import { storage } from "../firebase/firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";

const PetProfile = ({ avatarUri, name, birthday, gender, spayed }) => {
  const spayedText = spayed === true ? "Spayed" : "Not Spayed";
  const genderIcon = gender === "male" ? "♂️" : "♀️";
  const pikachuAvatar =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png";
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function downloadAvatar() {
      const avatarRef = ref(storage, avatarUri);
      const avatarURL = await getDownloadURL(avatarRef);
      setAvatar(avatarURL);
    }
    // if petAvatar is null, use the default avatar pikachu
    if (avatarUri) {
      downloadAvatar();
    } else {
      setAvatar(pikachuAvatar);
    }
  }, []);

  return (
    <View style={styles.petProfileWrapper}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.petAvatar} source={{ uri: avatar }} />
        <Text style={{ fontSize: 18 }}> {genderIcon} </Text>
      </View>
      <Text style={styles.petProfileName}>{name}</Text>
      <Text style={{ color: colors.defaultTextColor }}>
        Born on {birthday}{" "}
      </Text>
      <Text style={{ color: colors.defaultTextColor }}>{spayedText}</Text>
    </View>
  );
};

export default PetProfile;
