import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import WatchedItem from "./WatchedItem";
import { useNavigation } from "@react-navigation/native";

let navigation;
const WatchedItemWishList = ({ deals, title }) => {
  navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.cont}>
        <Pressable
          style={styles.textHolder}
          // onPress={() => navigation.navigate("WatchingTabBar~")}
        >
          <Text style={styles.text}>{title}</Text>
          <MaterialIcons name="arrow-forward-ios" size={22} color={"black"} />
        </Pressable>
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
                <WatchedItem
                  uri={item.uri}
                  description={item.description}
                  orgPrice={item.orgPrice}
                  discPrice={item.discPrice}
                  key={item.id}
                  shipping={item.shipping}
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

export default WatchedItemWishList;

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
    marginRight: 10,
  },
});
