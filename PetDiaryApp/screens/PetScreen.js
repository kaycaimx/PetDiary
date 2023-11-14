import { Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import EntriesList from "../components/EntriesList";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { collection, onSnapshot } from "firebase/firestore";
import { database } from '../firebase/firebaseSetup';

import { activitiesMenu } from "../constants";
import { styles } from "../styles";

const PetScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);

  function addPressHandler() {
    navigation.navigate("Add Log");
  }

  function selectHanlder(item) {
    console.log(item);
  }

  useEffect(() => {
    const logsRef = collection(database, "logs");

    const unsubscribe = onSnapshot(logsRef, (snapshot) => {
      const logData = [];
      snapshot.forEach((doc) => {
        logData.push({ id: doc.id, ...doc.data() });
      });
      setLogs(logData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function LogPressHandler(pressedLog) {
    // we should navigate to edit screen and show log details
    navigation.navigate("Edit Log", { logs: pressedLog });
  }

  return (
    <GestureHandlerRootView style={styles.view}>
      <Text>Pet Screen</Text>
      <DropdownMenu
        pickerMenu={activitiesMenu}
        placeHolder="🔍Search for activities"
        isSearching={true}
        selectHandler={selectHanlder}
      />
      <Button title="Add Activity" onPress={addPressHandler} />
      <EntriesList data={logs} pressHandler={LogPressHandler} />
    </GestureHandlerRootView>
  );
};

export default PetScreen;
