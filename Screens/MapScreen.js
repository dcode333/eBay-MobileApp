import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../ContextProvider/useAuth";
import { ActivityIndicator } from "react-native-paper";

let regionName;
let getLocation;
let userAdress;
export default function App() {
  const { setUserLocation, user } = React.useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const [loader, setloader] = React.useState(false);
  const [address, setAddress] = useState(null);
  const mapRef = React.useRef();

  useEffect(() => {
    getLocation();

    return () => setloader(false);
  }, []);

  userAdress = () => {
    if (address)
      return `"${address?.name}" ${address?.district} ${address?.city}, ${address?.region}, ${address?.country}`;
  };

  getLocation = () => {
    setloader(true);
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        let { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);

        if (coords) {
          let { longitude, latitude } = coords;

          regionName = await Location.reverseGeocodeAsync({
            longitude,
            latitude,
          });
          setAddress(regionName[0]);
          setUserLocation(regionName[0]);
          setloader(false);
        }
      } catch (e) {
        setloader(false);
        return;
      }
    })();
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          }}
        >
          <MapView.Circle
            center={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            radius={15}
            strokeWidth={1}
            strokeColor="#3399ff"
            fillColor="#E1F5FE"
          />
          <Marker
            identifier="focus"
            key={"focus"}
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0.05,
            }}
            title={user?.username}
          >
            <Image
              source={{
                uri: user?.url,
              }}
              style={styles.image}
            />
          </Marker>
        </MapView>
      )}
      <View style={styles.address}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={30} color={"royalblue"} />
        </View>
        <TouchableOpacity
          style={{ flex: 0.85 }}
          onPress={() => {
            getLocation();
            address ? mapRef.current.fitToSuppliedMarkers(["focus"]) : null;
          }}
        >
          <Text style={styles.big} numberOfLines={4}>
            {!location ? "Get your location..." : userAdress()}
          </Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator
        size={50}
        style={{ position: "absolute", top: 340, alignSelf: "center" }}
        color={"royalblue"}
        animating={loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 3,
    alignSelf: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  address: {
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 80,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 8,
  },
  image: { height: 70, width: 70, borderRadius: 50 },
  iconContainer: {
    flex: 0.15,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
