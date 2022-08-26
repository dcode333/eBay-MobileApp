import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductListSceen from "../Screens/ProductListSceen";
import StackNavHeader from "./Navigation_Components/StackNavHeader";
import ProductDetailScreen from "../Screens/ProductDetailScreen";
import CatagoryScreen from "../Screens/CatagoryScreen";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import SearchScreen from "../Screens/SearchScreen";
import UserAccount from "../Screens/UserAccount";
import TopTabBar from "./TopTabBar";
import Selling from "../Screen_Components/HomeScreen_Components/Selling";
import CheckoutScreen from "../Screens/CheckoutScreen";
import PurchaseScreen from "../Screens/PurchaseScreen";
import WatchingTabBar from '../Screen_Components/WatchingScreen Components/WatchingTabBar'

import SearchByImage from "../Screens/SearchByImage";
import ModalStackNav from "./ModalStackNav";
import NewPaymentCard from "../Screen_Components/CheckoutScreen_Components/NewPaymentCard";
import { AuthContext } from "../ContextProvider/useAuth";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const { demo, user } = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          header: () => {
            return <StackNavHeader title={"Home" } />;
          },
        }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          title: "Checkout",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <Stack.Screen
        name="PurchaseScreen"
        component={PurchaseScreen}
        options={{
          title: "Purchases",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="WatchingTabBar"
        component={WatchingTabBar}
        options={{
          title: "Wishlist",
          headerTitleStyle: { fontWeight: "bold",fontSize:22},
        }}
      />

      <Stack.Screen
        name="SearchByImage"
        component={SearchByImage}
        options={{
          header: () => {
            return <StackNavHeader title={"Search by Image"} />;
          },
        }}
      />
      <Stack.Screen
        name="Selling"
        component={Selling}
        options={{
          header: () => {
            return <StackNavHeader title={"Stores"} />;
          },
        }}
      />
      <Stack.Screen
        name="UserAccount"
        component={UserAccount}
        options={{
          header: () => {
            return <StackNavHeader title={"My Profile"} />;
          },
        }}
      />
      <Stack.Screen
        name="TabBar"
        component={TopTabBar}
        options={{
          title: user?.username,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShoppingItem"
        component={CartScreen}
        options={{
          header: () => {
            return <StackNavHeader title={"Shopping Cart"} />;
          },
        }}
      />
      <Stack.Screen
        name="eBay"
        component={ProductListSceen}
        options={{
          header: () => {
            return <StackNavHeader title={"Items"} />;
          },
        }}
      />
      <Stack.Screen
        name="NewPaymentCardScreen"
        component={NewPaymentCard}
        options={{
          title: "Card Details",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="Catagories"
        component={CatagoryScreen}
        options={{
          header: () => {
            return <StackNavHeader title={"Catagories"} />;
          },
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          header: () => {
            return <StackNavHeader title={"Item"} />;
          },
        }}
      />
      <Stack.Screen name="ModalStackNav" component={ModalStackNav} />
    </Stack.Navigator>
  );
};

export default StackNav;
