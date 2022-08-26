import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

let navigation;
const SearchBar = () => {
  navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.c2_2}
      onPress={() => {
        navigation.navigate("SearchScreen");
      }}
    >
      <View
        style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
      >
        <Ionicons name="search-outline" size={30} />
      </View>
      <View style={styles.c2_2_lefticon}>
        <Text style={styles.c2_2_text}>Search on eBay...</Text>
      </View>
      <View style={styles.c2_2_rightIcon}>
        <Ionicons name="md-mic-outline" size={30} />
      </View>
      <View style={[styles.c2_2_rightIcon, { marginLeft: 10 }]}>
        <Ionicons name="camera-outline" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  c2_2: {
    height: 40,
    width: 360,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    alignSelf: "center",
    flexDirection: "row",
    borderWidth: 0.3,
  },
  c2_2_text: {
    fontSize: 18,
    color: "grey",
  },
  c2_2_rightIcon: {
    flex: 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  c2_2_lefticon: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
