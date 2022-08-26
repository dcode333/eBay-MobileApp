import { Pressable, StyleSheet, Text, View,Image } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const SearchByImage = () => {
    const [event, setevent] = React.useState(null); 

  const selectImage = async () => {
    try {
      const sel = await ImagePicker.launchImageLibraryAsync();
      setevent(sel.uri); 

    } catch (error) {
      console.log(error);
    }
  }; //wrap in try catch

  return (
    <View style={styles.container}>
          <Image
        source={{uri:event}}
        resizeMode={'cover'}
        style={{ width: '100%', height: '50%', borderRadius: 20 }}
      />
      <View style={styles.subContainer}>
        <Pressable
          style={styles.barCont}
          onPress={() => {
            selectImage();
          }}
        >
          <View style={styles.bar}>
            <Text>Select from gallery</Text>
          </View>
          <MaterialCommunityIcons name="image" size={30} color={"royalblue"} />
        </Pressable>
        <Pressable style={styles.barCont}  onPress={() => {
            selectImage();
          }}>
          <View style={styles.bar}>
            <Text>Take a new Photo</Text>
          </View>
          <Ionicons name="camera" size={30} color={"#87DF2E"} />
        </Pressable>
        <Pressable style={styles.barCont}  onPress={() => {
            selectImage();
          }}>
          <View style={styles.bar}>
            <Text>Scan Bar code</Text>
          </View>
          <Ionicons name="barcode" size={30} color={"white"} />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchByImage;

const styles = StyleSheet.create({
  barCont: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.32,
    marginVertical: 2,
    flexDirection: "row",
  },
  bar: {
    height: 30,
    width: 150,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  container: {
    backgroundColor: "#616161",
    flex: 1,
  },
  subContainer: {
    height: 250,
    width: 250,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
