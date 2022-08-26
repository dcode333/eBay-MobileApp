import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const HorizantalListItem = ({
  uri,
  title,
  onPress,
  width,
  height,
  containerStyle,
}) => {
  return (
    <Pressable
      style={[
        {
          height: height ? height : 180,
          width: width ? width : 100,
          marginTop: 35,
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 0.6, borderRadius:50}}> 
        <Image
          source={{
            uri: uri,
          }}
          resizeMode={"contain"}
          style={{ height: "100%", width: "100%",borderRadius:50}}
        />
      </View>
      <View style={styles.textCont}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default HorizantalListItem;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  textCont: {
    flex: 0.4,
    alignItems: "center",
    // justifyContent: "center",
  
  },
});
