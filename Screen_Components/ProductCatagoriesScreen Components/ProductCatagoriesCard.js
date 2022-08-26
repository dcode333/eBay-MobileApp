import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

export default function CategoriesCard({ image, title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={{
            uri: image,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.77,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  titleContainer: {
    flex: 0.23,
    alignSelf: "center",
    // backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 170,
    width: 170,
    overflow: "hidden",
    margin: 10,
    elevation: 10,
  },
});
