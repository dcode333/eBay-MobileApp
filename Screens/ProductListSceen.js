import { View, StyleSheet, Text } from "react-native";
import React from "react";
import ProductList from "../Screen_Components/ListScreen_Components/productList";
import { AuthContext } from "../ContextProvider/useAuth";
import { useQuery } from "@apollo/client";
import {
  FetchCategoryProducts,
  apiCatagoryProductsDataFormatter,
} from "../strapiDataFetcher/strapiDataFetcher";
import LoottieView from "lottie-react-native";

const ProductListSceen = ({ route }) => {
  const { title, filterBase } = route.params;
  const {
    data: CategoryData,
    loading,
    error,
  } = useQuery(FetchCategoryProducts, {
    variables: {
      CatName: title,
    },
  });
  const { data, demo, setData, setDemo } = React.useContext(AuthContext); //....
  const [isSplashing, setIsSplashing] = React.useState(false);

  React.useEffect(() => {
    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 1000);
    if (CategoryData) {
      // console.log('api data==>',CategoryData)
      setData(
        apiCatagoryProductsDataFormatter(CategoryData).filter(
          (x) => x.seller === filterBase
        )
      );
      setDemo(
        apiCatagoryProductsDataFormatter(CategoryData).filter(
          (x) => x.seller === filterBase
        )
      );
    }

    return () => setIsSplashing(false);
  }, [CategoryData]);

  if (loading || error)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {error ? error.message + " ==> In ProductListScreen" : " "}
        </Text>
      </View>
    );

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
  // query,usequery
  return (
    <View>
      <ProductList data={data} />
    </View>
  );
};

export default ProductListSceen;

const styles = StyleSheet.create({
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
