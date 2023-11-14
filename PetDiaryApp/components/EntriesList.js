import { Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PressableButton from "./PressableButton";
import { colors, styles } from "../styles";

const EntriesList = ({ data, pressHandler}) => {

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <PressableButton
            pressedFunction={() => pressHandler(item)}
            android_ripple={{ color: "#f00" }}
            defaultStyle={styles.EntryListContainer}
            pressedStyle={styles.EntryListLogPressed}
          >
            <Text style={styles.EntryListText}>{item.type}</Text>
            <View style={styles.EntryListAdditionalArea}>
              <Text>
                {item.content}
              </Text>
            </View>
          </PressableButton>
        </View>
      )}
    />
  );
};

export default EntriesList;
