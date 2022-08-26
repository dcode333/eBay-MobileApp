import { StyleSheet, FlatList, Text, View } from "react-native";
import React from "react";
import { AuthContext } from "../ContextProvider/useAuth";
import CartCard from "../Screen_Components/Cart_Component/CartCard";
import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import NothingToShow from "../Screen_Components/HomeScreen_Components/NothingToShow";
import { useQuery, useMutation } from "@apollo/client";
import LoottieView from "lottie-react-native";

import {
  FetchCartProducts,
  apiCartDataFormatter,
  CreateCart,
  DeleteCart,
  FetchSaveForLaterProducts,
  DeleteFromSaveForLater,
  CreateSaveForLater,
  apiSaveForLaterFormatter,
} from "../strapiDataFetcher/strapiDataFetcher";

let sum;
let cartPressb2;
let cartPressb1;
// let saveForlaterPressb2;
let saveForlaterPressb1;
let cartRemover;
let saveForLaterRemover;
//============================Functions================================================
const totalPrice = (cart) => {
  sum = 0;
  cart.forEach((x) => (sum += x.price * x.quantity));
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};

const totalShipping = (cart) => {
  sum = 0;
  cart.forEach((x) => (sum += x.shipping));
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};

const totalToPay = (cart) => {
  sum = totalPrice(cart) + totalShipping(cart);
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};

console.log(" in cs");
const CartScreen = () => {
  const navigation = useNavigation();
  const [addCarttoStrapi] = useMutation(CreateCart);
  const [removeCartStrapi] = useMutation(DeleteCart);
  const [RemoveSaveForLaterFromStrapi] = useMutation(DeleteFromSaveForLater);
  const [addSaveForLaterToStrapi] = useMutation(CreateSaveForLater);
  const [isSplashing, setIsSplashing] = React.useState(false);

  const {
    setCartNotification,
    cartNotification,
    saveForlater,
    setSaveForlater,
    setCheckout,
    cartArray,
    setCartArray,
    user,
  } = React.useContext(AuthContext);
  const {
    data: CartData,
    loading,
    error,
  } = useQuery(FetchCartProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user.id,
    },
  });

  const {
    data: SaveForLaterData,
    loading: saveForLaterLoading,
    error: saveForlaterError,
  } = useQuery(FetchSaveForLaterProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user.id,
    },
  });

  React.useEffect(() => {
    if (CartData && SaveForLaterData) {
      setCartArray(apiCartDataFormatter(CartData));
      setCartNotification(apiCartDataFormatter(CartData).length);
      setSaveForlater(apiSaveForLaterFormatter(SaveForLaterData));
      // console.log("in cs sfl", apiSaveForLaterFormatter(SaveForLaterData));
    }

    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 1000);

    return () => setIsSplashing(false);
  }, [CartData, SaveForLaterData]);

  cartRemover = async (id) => await removeCartStrapi({ variables: { id: id } });
  saveForLaterRemover = async (id) =>
    await RemoveSaveForLaterFromStrapi({ variables: { id: id } });

  const addCarttoStrapiCaller = async (item) => {
    try {
      await addCarttoStrapi({
        variables: {
          productId: item.productId,
          userId: user.id,
          quantity: item.quantity,
        },
      });
    } catch (error) {
      console.log("Error in addToCart in strapi: ", error.toString());
    }
  };

  const addSaveForLatertoStrapiCaller = async (item) => {
    try {
      await addSaveForLaterToStrapi({
        variables: {
          productId: item.productId,
          userId: user.id,
          quantity: item.quantity,
        },
      });
    } catch (error) {
      console.log("Error in addToSAveforLater in strapi: ", error.toString());
    }
  };

  cartPressb1 = (item) => {
    setSaveForlater(saveForlater.concat([{ ...item }]));
    setCartArray(cartArray.filter((c) => c.identity !== item.identity));
    setCartNotification(cartNotification - 1);
    navigation.replace("ShoppingItem");
  };
  cartPressb2 = (item) => {
    setCartArray(cartArray.filter((c) => c.identity !== item.identity));
    setCartNotification(cartNotification - 1);
    navigation.replace("ShoppingItem");
  };

  saveForlaterPressb1 = (item) => {
    setCartNotification(cartNotification + 1);
    // setCart(cart.concat([{ ...item }]));
    // setSaveForlater(saveForlater.filter((c) => c.identity !== item.identity));
    navigation.replace("ShoppingItem");
  };
  // saveForlaterPressb2 = (item) => {
  //   setSaveForlater(saveForlater.filter((c) => c.identity !== item.identity));
  // };

  //=====================================UI================================================

  if (loading || error)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>{error ? error.message : " "}</Text>
      </View>
    );

  if (saveForLaterLoading || saveForlaterError)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {saveForlaterError ? saveForlaterError.message : " "}
        </Text>
      </View>
    );

  if (!cartArray.length && !saveForlater.length)
    return (
      <NothingToShow
        IconName={"remove-shopping-cart"}
        title={"No items Saved or in Cart"}
      />
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
  } else {
    return (
      <ScrollView>
        <ScrollView horizontal>
          <FlatList
            data={cartArray}
            keyExtractor={(item) => item.id}
            // ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            ListFooterComponent={() => <View style={styles.listSeperator} />}
            renderItem={({ item }) => {
              return (
                <CartCard
                  id={item.identity}
                  size={item.size}
                  price={item.price}
                  shipping={item.shipping}
                  quantity={item.quantity}
                  b1={"Save for later"}
                  b2={"Remove"}
                  onPressb1={() => {
                    cartRemover(item.id);
                    cartPressb1(item);
                    addSaveForLatertoStrapiCaller(item);
                  }}
                  onPressb2={() => {
                    cartRemover(item.id);
                    cartPressb2(item);
                  }}
                  description={item.description}
                  uri={item.uri}
                  cartArray={cartArray}
                  setCartArray={setCartArray}
                />
              );
            }}
          />
        </ScrollView>
        {cartArray.length !== 0 ? (
          <>
            <View style={styles.total}>
              <View style={{ flex: 0.5 }}>
                <Text
                  style={styles.totalText}
                >{`Items(${cartArray.length})`}</Text>
                <Text style={styles.totalText}>{`Shipping`}</Text>
                <Text style={styles.totalText}>{`Import Charges`}</Text>
              </View>

              <View style={styles.subContainer}>
                <Text
                  style={[styles.totalText, { color: "black" }]}
                >{`US $${totalPrice(cartArray)}`}</Text>
                <Text
                  style={[styles.totalText, { color: "black" }]}
                >{`US $${totalShipping(cartArray)}`}</Text>
                <Text
                  style={[styles.totalText, { color: "black" }]}
                >{`$00.00`}</Text>
              </View>
            </View>
            <View style={styles.listSeperator} />
            <View style={styles.total}>
              <View style={{ flex: 0.5 }}>
                <Text
                  style={[styles.totalText, { color: "black", fontSize: 22 }]}
                >{`Subtotal`}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text
                  style={[styles.totalText, { color: "black", fontSize: 22 }]}
                >{`US $${totalToPay(cartArray)}`}</Text>
              </View>
            </View>
            <HSbutton
              height={48}
              width={370}
              style={{ alignSelf: "center", marginTop: 5 }}
              text={"Go to Checkout"}
              textColor={"white"}
              backgroundColor={"royalblue"}
              onPress={() => {
                setCheckout([...cartArray]);
                navigation.navigate("CheckoutScreen");
              }}
            />
          </>
        ) : (
          console.log("first")
        )}
        {saveForlater.length !== 0 ? (
          <Text
            style={styles.savedForLater}
          >{`Saved For Later (${saveForlater.length})`}</Text>
        ) : (
          console.log("first")
        )}
        <ScrollView horizontal>
          <FlatList
            data={saveForlater}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            ListFooterComponent={() => <View style={styles.listSeperator} />}
            renderItem={({ item }) => {
              return (
                <CartCard
                  size={item.size}
                  price={item.price}
                  shipping={item.shipping}
                  b1={"Add to cart"}
                  b2={"remove"}
                  onPressb1={() => {
                    addCarttoStrapiCaller(item);
                    saveForlaterPressb1(item);
                    saveForLaterRemover(item.id);
                  }}
                  onPressb2={() => {
                    saveForLaterRemover(item.id);
                    navigation.replace("ShoppingItem");
                  }}
                  description={item.description}
                  uri={item.uri}
                />
              );
            }}
          />
        </ScrollView>
      </ScrollView>
    );
  }
};

export default CartScreen;

const styles = StyleSheet.create({
  listSeperator: {
    height: 1,
    width: "95%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
  subContainer: {
    flex: 0.5,
    alignItems: "flex-end",
    marginRight: 10,
  },
  total: {
    width: "100%",
    flexDirection: "row",
  },
  totalText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    color: "grey",
  },
  savedForLater: {
    marginVertical: 7,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 18,
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
