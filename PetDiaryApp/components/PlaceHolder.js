import { View, Text } from "react-native";
import React from "react";

import { styles } from "../styles";

const PlaceHolder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>
        You don't have any pet in record, please add a pet first 😃{" "}
      </Text>
    </View>
  );
};

export default PlaceHolder;
