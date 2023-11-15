import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseSetup";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import DropdownMenu from "../components/DropdownMenu";
import LogEntry from "../components/LogEntry";

import { activitiesMenu } from "../constants";
import { styles } from "../styles";

const PetScreen = ({ navigation, route }) => {
  //console.log(route.name);

  const [logList, setLogList] = useState([]);
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    let q;
    if (!searchType || searchType === "All") {
      q = query(collection(database, "logs"), orderBy("createdAt", "desc"));
    } else {
      q = query(
        collection(database, "logs"),
        where("type", "==", searchType),
        orderBy("createdAt", "desc")
      );
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ ...doc.data(), id: doc.id });
      });
      setLogList(logs);
    });
    return () => unsubscribe();
  }, [searchType]);

  function selectHanlder(search) {
    console.log(search["label"]);
    setSearchType(search["label"]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logListWrapper}>
        <DropdownMenu
          pickerMenu={[{ label: "All", value: "all" }, ...activitiesMenu]}
          placeHolder="🔍Search for activities"
          isSearching={true}
          selectHandler={selectHanlder}
        />
        <FlatList
          data={logList}
          renderItem={({ item }) => (
            <LogEntry navigation={navigation} entry={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PetScreen;
