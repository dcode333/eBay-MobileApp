import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const NothingToShow = ({ IconName, title }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={IconName} size={100} color={"grey"} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
    </View>
  );
};

export default NothingToShow;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
