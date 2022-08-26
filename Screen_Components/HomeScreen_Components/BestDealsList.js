import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BestDealsItem from "./BestDealsItem";

const BestDealsList = ({ deals, title }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.cont}>
        <View style={styles.textHolder}>
          <Text style={styles.text}>{title}</Text>
          <MaterialIcons name="arrow-forward-ios" size={22} />
        </View>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={deals}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <BestDealsItem
                  uri={item.uri}
                  description={item.description}
                  orgPrice={item.orgPrice}
                  discPrice={item.discPrice}
                  key={item.id}
                  shipping={item.shippingPrice}
                  id={item.identity}
                  productId={item.productId}
                  seller={item.seller}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BestDealsList;

const styles = StyleSheet.create({
  cont: {
    height: 340,
    width: "100%",
  },
  textHolder: { height: 30, flexDirection: "row", alignItems: "center" },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 15,
    marginRight: 5,
  },
});
