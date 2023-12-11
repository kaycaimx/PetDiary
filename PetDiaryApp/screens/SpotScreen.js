import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { yelpAPIKey } from "@env";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles, colors } from "../styles";
import BusinessInfo from "../components/BusinessInfo";
import Map from "../components/Map";
import PressableIconWithText from "../components/PressableIconWithText";

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
    } catch (err) {
      console.log("locate user ", err);
    }
  }

  const openMap = () => {
    if (petServices.length === 0) {
      Alert.alert("No pet services to show");
      return;
    }
    setModalVisible(true);
  };

  const closeMap = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Nearby Pet Services</Text>
      <View style={styles.addPetCameraWrapper}>
        <PressableIconWithText pressHandler={locateUserHandler}>
          <FontAwesome5
            name="map-marker-alt"
            size={18}
            color={colors.defaultTextColor}
          />
          <Text style={styles.iconWithTextPressableText}>Locate Me</Text>
        </PressableIconWithText>
        <PressableIconWithText pressHandler={openMap}>
          <FontAwesome5
            name="map-marked-alt"
            size={18}
            color={colors.defaultTextColor}
          />
          <Text style={styles.iconWithTextPressableText}>Map View</Text>
        </PressableIconWithText>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <Map businesses={petServices} closeMapHandler={closeMap} />
      </Modal>
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search for ..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      {!userLocation && (
        <Text style={styles.iconWithTextPressableText}>Loading...</Text>
      )}
      {userLocation && (
        <View style={styles.businessInfoContainer}>
          <FlatList
            data={petServices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BusinessInfo
                image_url={item.image_url}
                name={item.name}
                rating={item.rating}
                url={item.url}
              />
            )}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.businessInfoColumnWrapper}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SpotScreen;
