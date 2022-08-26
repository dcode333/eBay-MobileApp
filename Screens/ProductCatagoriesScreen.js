import { View, FlatList, StyleSheet, Alert } from "react-native";
import React from "react";
import categoryData from "../Screen_Components/ProductCatagoriesScreen Components/ProductCatagoriesdata";

import CategoriesCard from "../Screen_Components/ProductCatagoriesScreen Components/ProductCatagoriesCard";

const Catagories = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={categoryData}
        keyExtractor={(items) => items.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <CategoriesCard
              title={item.title}
              image={item.url}
              onPress={() =>
                Alert.alert(
                  `Availibility Report`,
                  `${item.title} items will be availible soon\nFor more please visit www.eBay.com`
                )
              }
            />
          );
        }}
      />
    </View>
  );
};

export default Catagories;

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    width: "90%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
});
