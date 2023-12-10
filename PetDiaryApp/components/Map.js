import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";

import PressableButton from "./PressableButton";

import { styles } from "../styles";

const Map = ({ businesses, closeMapHandler }) => {
  const firstBusinessCords = businesses[0].coordinates;

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: firstBusinessCords.latitude,
          longitude: firstBusinessCords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {businesses.map((marker, index) => {
          if (marker.coordinates.latitude && marker.coordinates.longitude) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                }}
              >
                <Callout>
                  <View>
                    <Text>{marker.name}</Text>
                    <Text>
                      Tel:
                      {marker.display_phone
                        ? marker.display_phone
                        : "No phone number available"}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          } else {
            return null;
          }
        })}
      </MapView>
      <View style={styles.mapButtonWrapper}>
        <PressableButton
          pressedFunction={closeMapHandler}
          defaultStyle={styles.setNotificationButton}
          pressedStyle={styles.buttonPressed}
          disabled={false}
        >
          <Text style={styles.buttonText}>Back to List View</Text>
        </PressableButton>
      </View>
      {/* <Text>Map</Text>
      <Button title="List View" onPress={closeMapHandler} /> */}
    </>
  );
};

export default Map;
