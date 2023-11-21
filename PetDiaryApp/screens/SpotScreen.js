import {
  FlatList,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { yelpAPIKey } from "@env";

import { styles } from "../styles";

const SpotScreen = ({ navigation }) => {
  const [petServices, setPetServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("pets");

  useEffect(() => {
    // Function to fetch nearby pet services using the Yelp API
    const fetchNearbyPetServices = async () => {
      try {
        const response = await fetch(
          `https://api.yelp.com/v3/businesses/search?term=${searchTerm}&latitude=49.282730&longitude=-123.120735`,
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Explore Nearby Pet Services</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search for Pet Services"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={petServices}
        keyExtractor={(item) => item.id}
        renderItem={renderPetServiceItem}
      />
    </SafeAreaView>
  );
};

export default SpotScreen;
