import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import NothingToShow from "../Screen_Components/HomeScreen_Components/NothingToShow";
import StrapiProducts from "../ContextProvider/StrapiProducts";
import { useNavigation } from "@react-navigation/native";

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#C8C8C8",
      }}
    />
  );
};
let ItemView;
let arr = [];
let searchFilterFunction;
let searched;
let demo;

const searchItem = (item, demo) => {
  demo.forEach((x) => {
    if (x.description.split(" ").slice(0, 6).join(" ") === item) {
      searched = x;
      return;
    }
  });
};
const App = () => {
  const navigation = useNavigation();
  demo = StrapiProducts;
  arr = demo.map((x) => {
    return x.description.split(" ").slice(0, 6).join(" ");
  });

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  ItemView = ({ item }) => {
    return (
      <View style={{ marginLeft: 30, flexDirection: "row" }}>
        <View style={{ flex: 0.85 }}>
          <Text
            style={styles.itemStyle}
            onPress={() => {
              searchItem(item, demo);
              navigation.navigate("ProductDetail", {
                shipping: searched.shippingPrice,
                orgPrice: searched.orgPrice,
                discPrice: searched.discPrice,
                description: searched.description,
                uri: searched.uri,
                id: searched.identity,
                productId: searched.productId,
                seller: searched.seller,
              });
            }}
          >
            {item}
          </Text>
        </View>
        <Pressable
          style={{ alignSelf: "flex-end", flex: 0.15 }}
          onPress={() => {
            setSearch(item);
          }}
        >
          <Feather name="arrow-up-left" size={30} />
        </Pressable>
      </View>
    );
  };

  searchFilterFunction = (text) => {
    setMasterDataSource(arr);
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item ? item.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource([]);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.c2_2}>
          <Pressable
            onPress={() => navigation.navigate("Home Screen")}
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-arrow-back" size={30} />
          </Pressable>
          <View style={styles.c2_2_lefticon}>
            <TextInput
              autoFocus
              round
              searchIcon={{ size: 24 }}
              onChangeText={(text) => searchFilterFunction(text)}
              placeholder="Type Here..."
              value={search}
              keyboardType={"web-search"}
            />
          </View>
          <View style={styles.c2_2_rightIcon}>
            <Ionicons name="mic" size={30} />
          </View>
          <View style={[styles.c2_2_rightIcon, { marginLeft: 10 }]}>
            <Ionicons name="camera-outline" size={30} />
          </View>
        </View>

        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
      {filteredDataSource.length == 0 && (
        <NothingToShow IconName={"search"} title={"Search on Ebay"} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 50,
  },
  itemStyle: {
    padding: 10,
  },
  c2_2: {
    height: 40,
    width: 360,
    backgroundColor: "#EEEEEE",
    borderRadius: 25,
    alignSelf: "center",
    flexDirection: "row",
    borderWidth: 0.3,
  },
  c2_2_text: {
    fontSize: 18,
    color: "grey",
  },
  c2_2_rightIcon: {
    flex: 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  c2_2_lefticon: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default App;
