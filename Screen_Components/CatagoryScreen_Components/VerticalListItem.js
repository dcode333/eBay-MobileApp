import { StyleSheet, Image, View } from "react-native";
import React from "react";

const VerticalListItem = ({uri}) => {
  return (
    <View
      style={{
        height: 180,
        width: "93%",
        backgroundColor: "grey",
        borderRadius: 25,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        elevation:18
      }}
    >
      <Image
        source={{
          uri:uri,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default VerticalListItem;