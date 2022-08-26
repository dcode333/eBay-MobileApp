import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../ContextProvider/useAuth";

import SortModal from "./SortModal";
import FilterModal from "./FilterModal";

const sizes = [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5];

const ProductListHeader = ({ dataCategory }) => {
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [sortModalVisible, setSortModalVisible] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);
  const { setData, demo } = React.useContext(AuthContext); //Here this is providing a global access to data
  console.log(dataCategory);
  return (
    <View>
      <View style={styles.appBarContainer}>
        <Pressable
          style={[{ flex: 0.5, marginLeft: 10 }, styles.appBarContent]}
          onPress={() => {
            saved ? setSaved(false) : setSaved(true);
          }}
        >
          <FontAwesome
            name={saved ? "heart" : "heart-o"}
            size={17}
            color="#304FFE"
          />
          <Text style={[styles.appBarText, { marginLeft: 5 }]}>
            {saved ? "Saved" : "Save this Search"}
          </Text>
        </Pressable>
        <Pressable
          style={[{ flex: 0.2 }, styles.appBarContent]}
          onPress={() => {
            setSortModalVisible(true);
          }}
        >
          <Text style={[styles.appBarText, { marginRight: 5 }]}>Sort</Text>
          <FontAwesome name="sort" size={24} color="#304FFE" />
        </Pressable>
        <Pressable
          style={[{ flex: 0.25, marginLeft: 5 }, styles.appBarContent]}
          onPress={() => {
            setFilterModal(true);
          }}
        >
          <Text style={[styles.appBarText, { marginRight: 5 }]}>
            Filter . 2
          </Text>
          <Ionicons name="filter-sharp" size={19} color="#304FFE" />
        </Pressable>
      </View>
      {dataCategory === "Nike" ||
      dataCategory === "Adidas" ||
      dataCategory === "Puma" ||
      dataCategory === "Converse" ? (
        <>
          <Text style={styles.heading}>Show by US shoe Size</Text>
          <View style={styles.sizeListCont}>
            <FlatList
              data={sizes}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={(index) => {
                index;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.sizeList,
                      {
                        backgroundColor:
                          selectedSize === item ? "red" : "#E0E0E0",
                      },
                    ]} //Color not changing bcuz array is in FL header and it rerenders alnong with FL
                    onPress={() => {
                      setData(
                        demo.filter((d) => {
                          return d.size === item;
                        })
                      );
                      setSelectedSize(item);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </>
      ) : null}
      <SortModal
        sortModalVisible={sortModalVisible}
        setSortModalVisible={setSortModalVisible}
      />
      <FilterModal filterModal={filterModal} setFilterModal={setFilterModal} />
    </View>
  );
};

export default ProductListHeader;

const styles = StyleSheet.create({
  sizeList: {
    width: 47,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  sizeListCont: {
    width: "100%",
    height: 40,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  heading: { fontSize: 20, fontWeight: "bold", margin: 12 },
  appBarText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#304FFE",
    marginBottom: 3.5,
  },
  appBarContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  appBarContainer: {
    height: 30,
    width: "100%",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
