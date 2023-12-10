import { Button, View, Text, Pressable } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

import PressableButton from "./PressableButton";

import { styles, colors } from "../styles";

const Map = ({ closeMapHandler }) => {
  const userCoords = { latitude: 49.2702199, longitude: -123.1356738 };
  const testCoords = [
    { latitude: 49.26152, longitude: -123.15288 },
    { latitude: 49.2684235, longitude: -123.1654402 },
    { latitude: 49.2771742, longitude: -123.1165242 },
    { latitude: 49.2637961378369, longitude: -123.185248525359 },
    { latitude: 49.26754855210776, longitude: -123.11340115858336 },
  ];

  const mockData = [
    {
      alias: "k9-sports-line-vancouver",
      categories: [[Object]],
      coordinates: { latitude: null, longitude: null },
      display_phone: "",
      distance: 0.20711998205582777,
      id: "Qj428drtV1KCDUe7f8ntuQ",
      image_url: "",
      is_closed: false,
      location: {
        address1: "",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "K9 Sports Line",
      phone: "",
      rating: 3,
      review_count: 1,
      transactions: [],
      url: "https://www.yelp.com/biz/k9-sports-line-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "pawsome-pet-care-services-vancouver",
      categories: [[Object], [Object]],
      coordinates: { latitude: 49.26039, longitude: -123.11336 },
      display_phone: "+1 604-338-8038",
      distance: 0.20711998205582777,
      id: "i5DpOiJpiyXPPp65kaOu2A",
      image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/jx01VEHUpv561kAPaZlV9Q/o.jpg",
      is_closed: false,
      location: {
        address1: null,
        address2: null,
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "Pawsome! Pet Care Services",
      phone: "+16043388038",
      rating: 5,
      review_count: 3,
      transactions: [],
      url: "https://www.yelp.com/biz/pawsome-pet-care-services-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "be-mine-poodle-vancouver",
      categories: [[Object]],
      coordinates: { latitude: null, longitude: null },
      display_phone: "+1 604-823-2467",
      distance: 0.20711998205582777,
      id: "3pQK9ZIVouHuUcZ7u3GiHQ",
      image_url: "",
      is_closed: false,
      location: {
        address1: "",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "Be Mine Poodle",
      phone: "+16048232467",
      rating: 4,
      review_count: 1,
      transactions: [],
      url: "https://www.yelp.com/biz/be-mine-poodle-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "full-circle-canine-massage-vancouver",
      categories: [[Object]],
      coordinates: { latitude: null, longitude: null },
      display_phone: "+1 604-916-2698",
      distance: 0.20711998205582777,
      id: "WlNIVBudVPlQu5bDQC8vlw",
      image_url: "",
      is_closed: false,
      location: {
        address1: "",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "Full Circle Canine Massage",
      phone: "+16049162698",
      rating: 3,
      review_count: 1,
      transactions: [],
      url: "https://www.yelp.com/biz/full-circle-canine-massage-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "hikin-hounds-vancouver",
      categories: [[Object], [Object]],
      coordinates: { latitude: 49.26039, longitude: -123.11336 },
      display_phone: "+1 778-834-3647",
      distance: 0.20711998205582777,
      id: "7zdQ9UcEMaxI7sZZcV8QUw",
      image_url: "",
      is_closed: false,
      location: {
        address1: "",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "Hikin' Hounds",
      phone: "+17788343647",
      rating: 1,
      review_count: 1,
      transactions: [],
      url: "https://www.yelp.com/biz/hikin-hounds-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "canine-solutions-dog-training-vancouver",
      categories: [[Object]],
      coordinates: { latitude: 49.26039, longitude: -123.11336 },
      display_phone: "+1 604-617-1231",
      distance: 0.20711998205582777,
      id: "Qy1e9XkXax3BleK3iUWrdw",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/1qDoDDVcil6jUbMZCT1SlQ/o.jpg",
      is_closed: false,
      location: {
        address1: "",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "",
      },
      name: "Canine Solutions Dog Training",
      phone: "+16046171231",
      rating: 4.5,
      review_count: 15,
      transactions: [],
      url: "https://www.yelp.com/biz/canine-solutions-dog-training-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "gilbie-media-vancouver",
      categories: [[Object], [Object], [Object]],
      coordinates: { latitude: 49.2831687927246, longitude: -123.12084197998 },
      display_phone: "+1 778-984-8201",
      distance: 53.46044889365864,
      id: "u--WT1llBOYxGOLcD6_Z7Q",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/7OZ8KxvCPXhPzzKoivDLJQ/o.jpg",
      is_closed: false,
      location: {
        address1: null,
        address2: null,
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "V6Z 2H7",
      },
      name: "Gilbie Media",
      phone: "+17789848201",
      rating: 5,
      review_count: 2,
      transactions: [],
      url: "https://www.yelp.com/biz/gilbie-media-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "luxe-york-of-canada-vancouver",
      categories: [[Object]],
      coordinates: { latitude: 49.2802, longitude: -123.113 },
      display_phone: "+1 604-353-3551",
      distance: 453.3035681844201,
      id: "DN31T-N9LptnSpOZRAvf7Q",
      image_url:
        "https://s3-media1.fl.yelpcdn.com/bphoto/Dw5R3y3Vbwcp6zsE-U2pNA/o.jpg",
      is_closed: false,
      location: {
        address1: null,
        address2: null,
        address3: null,
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "V6B 1Y0",
      },
      name: "Luxe York of Canada",
      phone: "+16043533551",
      rating: 5,
      review_count: 1,
      transactions: [],
      url: "https://www.yelp.com/biz/luxe-york-of-canada-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "dog-walkers-vancouver-vancouver",
      categories: [[Object]],
      coordinates: { latitude: 49.2824401, longitude: -123.1278926 },
      display_phone: "+1 778-668-8342",
      distance: 520.1803875989965,
      id: "b6GhYX4b8w0AYtIAT9AqwA",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/-bFI-KzDM3FJA15Yo-SPig/o.jpg",
      is_closed: false,
      location: {
        address1: "1075 Nelson Street",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "V6Z 3B6",
      },
      name: "Dog Walkers Vancouver",
      phone: "+17786688342",
      rating: 5,
      review_count: 3,
      transactions: [],
      url: "https://www.yelp.com/biz/dog-walkers-vancouver-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
    {
      alias: "paws-at-play-dog-walking-vancouver",
      categories: [[Object]],
      coordinates: { latitude: 49.27757, longitude: -123.11854 },
      display_phone: "+1 604-812-3052",
      distance: 629.088279996466,
      id: "PpflHpRhZcAKZK9AFhhSNw",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/mVPlDKI68s92NDRhuzo-6Q/o.jpg",
      is_closed: false,
      location: {
        address1: "2508-977 Mainland Street",
        address2: "",
        address3: "",
        city: "Vancouver",
        country: "CA",
        display_address: [Array],
        state: "BC",
        zip_code: "V6B 1T2",
      },
      name: "Paws At Play Dog Walking",
      phone: "+16048123052",
      rating: 5,
      review_count: 5,
      transactions: [],
      url: "https://www.yelp.com/biz/paws-at-play-dog-walking-vancouver?adjust_creative=Md9JV7g2VmW74fGD0bUVKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Md9JV7g2VmW74fGD0bUVKg",
    },
  ];

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {testCoords.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
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
