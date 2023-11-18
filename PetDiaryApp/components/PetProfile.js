import { Image, View, Text } from "react-native";
import React from "react";

import { colors, styles } from "../styles";

const PetProfile = ({ avatar, name, birthday, gender, spayed }) => {
  const spayedText = spayed === true ? "Spayed" : "Not Spayed";
  const genderIcon = gender === "male" ? "♂️" : "♀️";

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
