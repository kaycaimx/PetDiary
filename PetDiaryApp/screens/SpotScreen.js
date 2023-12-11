import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { yelpAPIKey } from "@env";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles, colors } from "../styles";
import BusinessInfo from "../components/BusinessInfo";
import Map from "../components/Map";

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

  const renderPetServiceItem = ({ item }) => (
    <View style={styles.yelpItem}>
      <TouchableOpacity onPress={() => openWebsite(item.url)}>
        <Text style={styles.yelpItemLabel}>{item.name}</Text>
      </TouchableOpacity>
      <Text>Rating: {item.rating}</Text>
      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 100, height: 100 }}
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
    if (petServices.length === 0) {
      Alert.alert("No pet services to show");
      return;
    }
    setModalVisible(true);
  };

  const closeMap = () => {
    setModalVisible(false);
  };

  const mockItem = {
    alias: "noelles-pet-love-vancouver",
    categories: [[Object], [Object]],
    coordinates: { latitude: 49.2602977, longitude: -123.1538651 },
    display_phone: "+1 604-442-5022",
    distance: 665.373894721793,
    id: "rB4PlbEWYLpZMy8bo-Dlow",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/L9G0vs2TFdTEO6P_Wwo08g/o.jpg",
    is_closed: false,
    location: {
      address1: "2167 W 13th Avenue",
      address2: null,
      address3: "",
      city: "Vancouver",
      country: "CA",
      display_address: [Array],
      state: "BC",
      zip_code: "V6K 2S2",
    },
    name: "Noelle's Pet Love",
    phone: "+16044425022",
    rating: 5,
    review_count: 4,
    transactions: [],
    url: "https://www.yelp.com/biz/noelles-pet-love-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Nearby Pet Services</Text>
      <View style={styles.addPetCameraWrapper}>
        <Pressable
          onPress={locateUserHandler}
          style={({ pressed }) => {
            return [
              styles.profileToLogPressable,
              pressed && styles.profileToLogPressed,
            ];
          }}
        >
          <FontAwesome5
            name="map-marker-alt"
            size={18}
            color={colors.defaultTextColor}
          />
          <Text style={styles.profileToLogPressableText}>Locate Me</Text>
        </Pressable>
        <Pressable
          onPress={openMap}
          style={({ pressed }) => {
            return [
              styles.profileToLogPressable,
              pressed && styles.profileToLogPressed,
            ];
          }}
        >
          <FontAwesome5
            name="map-marked-alt"
            size={18}
            color={colors.defaultTextColor}
          />
          <Text style={styles.profileToLogPressableText}>Map View</Text>
        </Pressable>
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
      {!userLocation && (
        <Text style={styles.profileToLogPressableText}>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default SpotScreen;
