import { View, StyleSheet, Text } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
const Ended = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="cancel" size={150} color={"grey"} />
      <Text>None ended</Text>
    </View>
  );
};

export default Ended; 

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
