import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import CheckoutCard from "../Screen_Components/CheckoutScreen_Components/CheckoutCard";
import { AuthContext } from "../ContextProvider/useAuth";
import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LoottieView from "lottie-react-native";
import { pushNotification } from "../Notifications/ExpoPushNotifications";
import { CreatePurchases } from "../strapiDataFetcher/strapiDataFetcher";
import { useMutation } from "@apollo/client";

let sum;
let removefromCheckout;
let navigation;
let setPaymentMethod;
let onCheckoutPress;
let addPurchasestoStrapiCaller;

const userAdress = (address) => {
  return `"${address?.name}" ${address?.district} ${address?.city}, ${address?.region}, ${address?.country}`;
};

const totalPrice = (checkout) => {
  sum = 0;
  checkout.forEach((x) => (sum += x.price * x.quantity));
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};

const totalShipping = (checkout) => {
  sum = 0;
  checkout.forEach((x) => (sum += x.shipping));
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};

const totalToPay = (checkout) => {
  sum = totalPrice(checkout) + totalShipping(checkout);
  return Math.round((sum + Number.EPSILON) * 100) / 100;
};
const CheckoutScreen = () => {
  const { checkout, setCheckout, userLocation, user, setloader } =
    React.useContext(AuthContext);
  const [paymentOption, setPaaymentOption] = React.useState(null);
  const [payButtonColor, setPayButtonColor] = React.useState("grey");
  const [isSplashing, setIsSplashing] = React.useState(false);
  const [addPurchasestoStrapi] = useMutation(CreatePurchases);

  navigation = useNavigation();
  setPaymentMethod = (title, color) => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
      setPaaymentOption(title);
      setPayButtonColor(color);
    }, 1000);
  };

  addPurchasestoStrapiCaller = async () => {
    try {
      for (let ck of checkout) {
        console.log(ck.productId);
        await addPurchasestoStrapi({
          variables: {
            productId: ck.productId,
            userId: user.id,
          },
        });
      }
    } catch (error) {
      console.log("Error in CheckoutScreen purchaseStrapi", error);
    }
  };

  removefromCheckout = (id) => {
    setCheckout( 
      checkout.filter((x) => {
        return x.id !== id;
      })
    );
  };

  onCheckoutPress = () => { 
    {
      setIsSplashing(true);
      pushNotification(checkout.length);
      setTimeout(() => {
        navigation.replace("PurchaseScreen");
        setIsSplashing(false);
      }, 3000);
    }
  };

  React.useEffect(() => {
    return () => {
      setIsSplashing(false);
      setloader(false);
    };
  }, []);

  if (isSplashing) {
    return (
      <LoottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("../assets/confirm.json")}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <ScrollView style={styles.container}>
          <ScrollView horizontal>
            <FlatList
              data={checkout}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <CheckoutCard
                    price={item.price}
                    shipping={item.shipping}
                    quantity={item.quantity}
                    description={item.description}
                    uri={item.uri}
                    removeOnPress={() => {
                      checkout.length === 1 ? navigation.goBack() : null;
                      removefromCheckout(item.id);
                    }}
                  />
                );
              }}
            />
          </ScrollView>
          <Pressable
            style={styles.shippment}
            onPress={() => navigation.navigate("MapScreen")}
          >
            <View style={{ flex: 0.2 }}>
              <Text style={styles.firstHead}>Ship to</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.secondHead}>
                {`${user?.username} ${
                  userLocation ? userAdress(userLocation) : ""
                }`}
              </Text>
            </View>
            <View style={styles.iconCont}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={50}
                style={{ marginLeft: 130 }}
              />
            </View>
          </Pressable>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.firstHead}>Pay with:</Text>
              <Text style={[styles.firstHead, { color: "red" }]}>
                Select a payment option
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                setPaymentMethod("Pay with your Card", "tomato")
                navigation.navigate("NewPaymentCardScreen", {
                  address: userLocation
                    ? userAdress(userLocation)
                    : "Get your Location from the Maps",
                });
              }}
            >
              <Image
                source={require("../assets/addCard.jpeg")}
                resizeMode={"contain"}
                style={styles.paymentImage}
              />
              <MaterialIcons
                name="keyboard-arrow-right"
                size={50}
                style={{ marginLeft: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => setPaymentMethod("Pay with Paypal", "blue")}
            >
              <Image
                source={require("../assets/paypal.jpeg")}
                resizeMode={"contain"}
                style={styles.paymentImage}
              />
              <MaterialIcons
                name="keyboard-arrow-right"
                size={50}
                style={{ marginLeft: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => setPaymentMethod("Buy with G pay", "black")}
            >
              <Image
                source={require("../assets/googlepay.jpeg")}
                resizeMode={"contain"}
                style={[styles.paymentImage, { height: 50, width: 135 }]}
              />
              <MaterialIcons
                name="keyboard-arrow-right"
                size={50}
                style={{ marginLeft: -5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listSeperator} />
          <View style={styles.total}>
            <View style={{ flex: 0.5 }}>
              <Text
                style={styles.totalText}
              >{`Items(${checkout.length})`}</Text>
              <Text style={styles.totalText}>{`Shipping`}</Text>
              <Text style={styles.totalText}>{`Import Charges`}</Text>
            </View>

            <View style={styles.subContainer}>
              <Text
                style={[styles.totalText, { color: "black" }]}
              >{`US $${totalPrice(checkout)}`}</Text>
              <Text
                style={[styles.totalText, { color: "black" }]}
              >{`US $${totalShipping(checkout)}`}</Text>
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
              >{`Order Total`}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text
                style={[
                  styles.totalText,
                  { color: "black", fontSize: 22, marginBottom: 20 },
                ]}
              >{`US $${totalToPay(checkout)}`}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.modal}>
        <HSbutton
          disable={paymentOption ? false : true}
          backgroundColor={payButtonColor}
          text={paymentOption ? paymentOption : "Confirm & Pay"}
          width={360}
          style={{ alignSelf: "center" }}
          textColor={"white"}
          height={50}
          onPress={() => {
            addPurchasestoStrapiCaller();
            onCheckoutPress();
          }}
        />
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  shippment: {
    width: "100%",
    flexDirection: "row",
  },
  firstHead: { fontSize: 16, margin: 10, fontWeight: "bold" },
  secondHead: {
    fontSize: 14,
    margin: 10,
    color: "grey",
  },
  iconCont: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: { flex: 0.1, borderTopWidth: 0.5, borderTopColor: "grey" },
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
    marginVertical: 3,
    fontWeight: "bold",
    color: "grey",
  },
  paymentImage: {
    height: 50,
    width: 100,
    alignSelf: "center",
    marginHorizontal: 100,
    // backgroundColor: "red",
  },
});
