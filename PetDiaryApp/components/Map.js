import { Text, View } from "react-native";
import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";

import PressableIconWithText from "./PressableIconWithText";
import { styles, colors } from "../styles";

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
        <PressableIconWithText pressHandler={closeMapHandler}>
          <FontAwesome5 name="list" size={18} color={colors.defaultTextColor} />
          <Text style={styles.iconWithTextPressableText}>
            Back to List View
          </Text>
        </PressableIconWithText>
      </View>
    </>
  );
};

export default Map;
