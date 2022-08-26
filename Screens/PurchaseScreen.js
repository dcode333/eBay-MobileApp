import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import NothingToShow from "../Screen_Components/HomeScreen_Components/NothingToShow";
import { AuthContext } from "../ContextProvider/useAuth";
import  ipAdress from '../ipAddress'
import PurchaseCard from "../Screen_Components/PurchaseScreen_Components/PurchaseCard";
import { FetchPurchaseProducts } from "../strapiDataFetcher/strapiDataFetcher";
import { useQuery } from "@apollo/client";
import LoottieView from "lottie-react-native";
const Inbox = () => {
  const { user } = React.useContext(AuthContext);
  const [isSplashing, setIsSplashing] = React.useState(false);

  const {
    data: purchaseProducts,
    loading,
    error,
  } = useQuery(FetchPurchaseProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user.id,
    },
  });

  React.useEffect(() => {
    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 2500);

    return () => setIsSplashing(false);
  }, []);

  if (loading || error)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {error ? error.message + " ==> In purchase Screen " : " "}
        </Text>
      </View>
    );

  if (!purchaseProducts.purchases.data.length) {
    return (
      <View style={styles.container}>
        <NothingToShow
          title={"You have no Purchaces"}
          IconName={"shopping-bag"}
        />
      </View>
    );
  }

  if (isSplashing) {
    return (
      <LoottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("../assets/load.json")}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={purchaseProducts.purchases.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <PurchaseCard
              orgPrice={item.attributes.product.data.attributes.Price}
              description={item.attributes.product.data.attributes.Description}
              uri={
                ipAdress +
                item.attributes.product.data.attributes.Image.data[0].attributes
                  .url
              }
              quantity={Math.floor(1 + Math.random() * 5)}
            />
          );
        }}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
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
