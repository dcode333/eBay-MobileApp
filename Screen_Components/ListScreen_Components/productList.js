import { StyleSheet, View, FlatList } from "react-native";
import React from "react";

import ListItem from "./ListItem";
import ProductListHeader from "./ProductListHeader";
// import {AuthContext} from '../../ContextProvider/useAuth'

const ProductList = ({ data }) => {

  return (
    <View>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.identity.toString()}
        ListHeaderComponent={(item) => (
          <>
            <ProductListHeader dataCategory={data[0]?.seller} />
            {/* <View style={[styles.listSeperator, { marginVertical: 3 }]} /> */}
          </>
        )}
        // ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
        renderItem={({ item }) => {
          return (
            <ListItem
              key={item.identity}
              id={item.identity}
              uri={item.uri}
              size={item.size}
              description={item.description}
              sponsored={item.sponsored}
              brandNew={item.brandNew}
              rating={item.rating}
              reviews={item.reviews}
              orgPrice={item.orgPrice}
              country={item.country}
              watchers={item.watchers}
              discPrice={item.discPrice}
              shipping={item.shippingPrice}
              productId={item.productId}
              seller={item.seller}
            />
          );
        }}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  listSeperator: {
    height: 1,
    width: "95%",
    margin: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
});
