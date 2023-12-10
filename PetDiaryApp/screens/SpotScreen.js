import {
  Alert,
  Button,
  FlatList,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { yelpAPIKey } from "@env";
import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";

import { styles, colors } from "../styles";
import Map from "../components/Map";
import PressableButton from "../components/PressableButton";

const SpotScreen = ({ navigation }) => {
  const [petServices, setPetServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [status, requestPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Function to fetch nearby pet services using the Yelp API
    const fetchNearbyPetServices = async () => {
      try {
        const response = await fetch(
          `https://api.yelp.com/v3/businesses/search?term=${
            searchTerm || "pets"
          }&latitude=${
            userLocation ? userLocation.latitude : 49.28273
          }&longitude=${
            userLocation ? userLocation.longitude : -123.120735
          }&sort_by=distance&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${yelpAPIKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch nearby pet services");
        }

        const data = await response.json();
        setPetServices(data.businesses);
        //console.log(petServices);
      } catch (error) {
        console.error("Error fetching nearby pet services:", error.message);
      }
    };

    // Call the function to fetch nearby pet services when the component mounts
    fetchNearbyPetServices();
  }, [searchTerm]); // Include searchTerm in the dependency array

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("We need to get access to your location");
      }
      const locationObject = await Location.getCurrentPositionAsync();

      setUserLocation({
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      });
      // console.log(userLocation.latitude);
      // console.log(userLocation.longitude);
    } catch (err) {
      console.log("locate user ", err);
    }
  }

  const renderPetServiceItem = ({ item }) => (
    <View style={styles.yelpItem}>
      <TouchableOpacity onPress={() => openWebsite(item.url)}>
        <Text style={styles.yelpItemLabel}>{item.name}</Text>
      </TouchableOpacity>
      <Text>Rating: {item.rating}</Text>
      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );

  const openWebsite = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening website:", err)
    );
  };

  const openMap = () => {
    setModalVisible(true);
  };

  const closeMap = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Nearby Pet Services</Text>
      <PressableButton
        pressedFunction={locateUserHandler}
        defaultStyle={styles.iconButton}
        pressedStyle={styles.buttonPressed}
        disabled={false}
      >
        <View style={[styles.buttonContainer, { marginTop: 0 }]}>
          <EvilIcons
            name="location"
            size={26}
            color={colors.defaultTextColor}
          />
          <Text>Explore Current Location</Text>
        </View>
      </PressableButton>
      <Button title="Map View" onPress={openMap} />
      <Modal visible={modalVisible} animationType="slide">
        <Map closeMapHandler={closeMap} />
      </Modal>
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search for ..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      {userLocation && (
        <FlatList
          data={petServices}
          keyExtractor={(item) => item.id}
          renderItem={renderPetServiceItem}
        />
      )}
    </SafeAreaView>
  );
};

export default SpotScreen;
