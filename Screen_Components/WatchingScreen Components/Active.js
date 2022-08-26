import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import NothingToShow from "../HomeScreen_Components/NothingToShow";

import { AuthContext } from "../../ContextProvider/useAuth";
import ActiveWishListCard from "./ActiveWishListCard";
import { useQuery } from "@apollo/client";
import {
  FetchWishListProducts,
  apiWishListFormatter,
} from "../../strapiDataFetcher/strapiDataFetcher";

import LoottieView from "lottie-react-native";

const Active = () => {
  const { wishList, setWishList, user } = React.useContext(AuthContext);
  const [isSplashing, setIsSplashing] = React.useState(false);

  const {
    data: wishListData,
    loading,
    error,
  } = useQuery(FetchWishListProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user.id,
    },
  });

  React.useEffect(() => {
    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 1000);

    if (wishListData) {
      setWishList(apiWishListFormatter(wishListData));
    }

    return () => setIsSplashing(false);
  }, [wishListData]);

  if (isSplashing) {
    return (
      <LoottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("../../assets/load.json")}
      />
    );
  }

  if (loading || error)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>{error ? error.message : " "}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {wishList.length === 0 ? (
        <NothingToShow IconName={"watch-later"} title={"No Active WatchList"} />
      ) : (
        <View style={{ flex: 1, margin: 5 }}>
          <FlatList
            data={wishList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.identity.toString()}
            ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            renderItem={({ item }) => {
              return (
                <ActiveWishListCard
                  key={item.identity}
                  id={item.identity}
                  uri={item.uri}
                  description={item.description}
                  orgPrice={item.orgPrice}
                  discPrice={item.discPrice}
                  shipping={item.shipping}
                  productId={item.productId}
                  seller={item.seller}
                  wishListId={item.id}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Active;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listSeperator: {
    height: 1,
    width: "95%",
    margin: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "royalblue",
  },
});
