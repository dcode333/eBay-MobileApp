import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import{AuthContext} from '../../ContextProvider/useAuth'

const CheckoutCard = ({
  sometext,
  uri,
  description,
  quantity,
  price,
  shipping,
  removeOnPress,
}) => {
 
  const {user}=React.useContext(AuthContext)


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.seller}>{`seller: ${"PUMA ltd"}`}</Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={styles.ImgCont}>
          <Image
            source={{
              uri: uri,
            }}
            style={styles.image}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.descCont}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.description}>
              <Text style={{ fontSize: 18 }}>{description}</Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <Text style={styles.price}>{`US $${price}`}</Text>
            </View>
          </View>
          {sometext && <Text>{sometext}</Text>}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.quantityText}>{`Quantity : ${quantity}`}</Text>
          </View>
          <Text
            style={styles.quantityText}
          >{`Shipping : US $${shipping}`}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={removeOnPress}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
      <View style={styles.listSeperator} />
      <Pressable style={styles.footer}>
        <View style={styles.messageTextCont}>
          <Text style={styles.messageText}>Message to seller</Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={45} />
        </View>
      </Pressable>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  container:{
    width: 390,
    alignSelf: "center",
    marginVertical: 5,
    backgroundColor:'#fff',
    // padding:10,
    borderRadius:20,
    elevation:10
  },
  ImgCont: {
    flex: 0.3,
    // backgroundColor: "red",
  },
  description: { flex: 0.6 },
  image: { width: 100, height: 100, alignSelf: "center", borderRadius: 17 },
  descCont: {
    flex: 0.7,
    // backgroundColor: "blue",
    flexDirection: "column",
  },
  messageText: {
    fontSize: 17,
  },
  messageTextCont: {
    flex: 0.85,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  seller: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  footer: {
    height: 50,
    width: "100%",
    flexDirection: "row",
  },
  listSeperator: {
    height: 1,
    width: "95%",
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
  iconContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
  },
  removeText: {
    alignSelf: "flex-end",
    color: "royalblue",
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
  },
  quantityText: {
    fontSize: 16,
    color: "grey",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
