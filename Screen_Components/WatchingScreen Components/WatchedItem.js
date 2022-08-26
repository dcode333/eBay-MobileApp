import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const discountPercentage = (orgPrice, discPrice) =>
  Math.round(((discPrice - orgPrice) / discPrice) * 100);

const BestDealsItem = ({
  uri,
  description,
  orgPrice,
  discPrice,
  shipping,
  id,
  productId,
  seller
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.cont}
      onPress={() => {
        navigation.navigate("ProductDetail", {
          shipping,
          orgPrice,
          discPrice: !discPrice ? null : discPrice, //see if error
          description,
          uri: [uri],
          id,
          productId,
          seller
        });
      }}
    >
      <View style={styles.imageHolder}>
        <Image
          source={{
            uri: uri,
          }}
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.descHolder}>
        <View style={{ flex: 0.55 }}>
          <Text numberOfLines={3} style={{ fontSize: 16, color: "#111820" }}>
            {description}
          </Text>
        </View>
        <View style={{ flex: 0.25 }}>
          <Text
            numberOfLines={3}
            style={{ fontSize: 20, color: "#111820", fontWeight: "bold" }}
          >
            {`$${orgPrice}`}
          </Text>
        </View>
        {discPrice !== 0 && (
          <View style={{ flex: 0.2, flexDirection: "row" }}>
            <Text style={styles.discount}>{`$${discPrice}`}</Text>
            <Text style={styles.original}>{`. ${discountPercentage(
              discPrice,
              orgPrice
            )}% Off `}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default BestDealsItem;

const styles = StyleSheet.create({
  cont: {
    width: 170,
    height: 280,
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 20,
    padding: 10,
    
  },
  original: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 14,
  },
  discount: {
    fontSize: 14,
    color: "grey",
    textDecorationLine: "line-through",
  },
  imageHolder: {
    flex: 0.6,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation:7
  },
  descHolder: {
    flex: 0.4,
    marginTop: 5,
  },
});
