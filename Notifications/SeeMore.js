import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const SeeMore = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="cancel" size={150} color={"grey"} />
      <Text>Nothing to Show</Text>
    </View>
  );
};

export default SeeMore;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
