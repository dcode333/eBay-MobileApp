import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Selling = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.desc}>
        <Ionicons
          name="alert-circle"
          size={28}
          color={"royalblue"}
          style={{ marginHorizontal: 10 }}
        />
        <Text style={styles.note}>
          To create a listing, please list on the website
        </Text>
      </View>
      <View>
        <Text style={styles.total}>{`$${0.0}`}</Text>
        <Text
          style={{ alignSelf: "center", color: "grey", fontSize: 18 }}
        >{`${90}-day total`}</Text>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity style={[styles.center, { flex: 0.32 }]}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: "royalblue" }}
          >{`${0}`}</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}
          >{`Stores`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.center, { flex: 0.32 }]}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: "royalblue" }}
          >{`${0}`}</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}
          >{`Products`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.center, { flex: 0.32 }]}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: "royalblue" }}
          >{`${0}`}</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}
          >{`Countries`}</Text>
        </TouchableOpacity>
      </View>
      <Pressable
        style={styles.imageStyle}
        onPress={() => Linking.openURL("https://export.ebay.com/en/")}
      >
        <Image
          source={require("../../assets/work.jpeg")}
          style={{ height: "100%", width: "100%" }}
          resizeMode={"contain"}
        />
      </Pressable>
    </View>
  );
};

export default Selling;

const styles = StyleSheet.create({
  desc: { flexDirection: "row", alignSelf: "center", marginVertical: 10 },
  note: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  total: {
    alignSelf: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusContainer: {
    flexDirection: "row",
    height: 60,
    width: 340,
    alignSelf: "center",
    marginTop: 20,
  },
  imageStyle: {
    alignSelf: "center",
    height: 400,
    width: 400,
    marginVertical: 30,
  },
});
