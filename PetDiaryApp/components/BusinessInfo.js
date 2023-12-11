import { Image, Linking, Pressable, Text } from "react-native";
import React from "react";

import { styles } from "../styles";

const BusinessInfo = ({ image_url, name, rating, url }) => {
  const openWebsite = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening website:", err)
    );
  };

  return (
    <Pressable
      onPress={() => openWebsite(url)}
      style={({ pressed }) => {
        return [
          styles.businessInfoWrapper,
          pressed && styles.iconWithTextPressed,
        ];
      }}
    >
      <Text style={styles.businessInfoTitleText}>{name}</Text>
      <Text style={styles.businessInfoRatingText}>Rating: {rating}</Text>
      {image_url ? (
        <Image
          source={{ uri: image_url }}
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <Image
          source={require("../assets/no-image-found.png")}
          style={{ width: 100, height: 100 }}
        />
      )}
    </Pressable>
  );
};

export default BusinessInfo;
