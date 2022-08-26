import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ActiveWishListCard = ({ uri, description, orgPrice, quantity, date }) => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image
            source={{
              uri: uri,
            }} //1
            resizeMode={"contain"}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textGrey}>shipped</Text>
          <Ionicons
            name="ios-checkmark-done-circle"
            size={20}
            color={"green"}
          />
        </View>
        <View style={{ marginVertical: 5, marginRight: 5 }}>
          <Text style={styles.text} /*2*/>{description}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text
            style={{ fontSize: 22, fontWeight: "bold" }}
          >{`$${orgPrice}`}</Text>
          {/*4*/}
        </View>
        <Text style={styles.textGrey}>Qty: {quantity}</Text>
      </View>
    </Pressable>
  );
};

export default ActiveWishListCard;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    height: 160,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    paddingTop: 5,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 0.4,
    // backgroundColor: "black",
  },
  image: {
    height: 140,
    width: 140,
    // alignSelf: "center",
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 7,
    marginLeft: 5,
  },
  detailContainer: {
    flex: 0.6,
    // backgroundColor: "royalblue",
    flexDirection: "column",
    marginLeft: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  textGrey: {
    color: "#9E9E9E",
    fontFamily: "Roboto",
    fontSize: 18,
    marginRight: 5,
    fontWeight: "bold",
  },
  ratingContainer: {
    // flex: 0.15,
    // backgroundColor: "orange",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  belowDisc: { color: "#9E9E9E", fontSize: 15 },
});
