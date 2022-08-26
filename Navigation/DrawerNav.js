import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import CustomDrawer from "./Navigation_Components/CustomDrawer";
import StackNav from "./StackNav";
import NotificationTabbar from "../Notifications/NotificationTabbar";
import MessagesTabBar from "../Messages/MessagesTabBar";
import StackNavHeader from "./Navigation_Components/StackNavHeader";
import SettingScreen from "../Screens/SettingScreen";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "../Screens/MapScreen";
import CustomerServiceScreen from "../Screens/CustomerServiceScreen";
import PurchaseScreen from "../Screens/PurchaseScreen";
import ProductCatagoriesScreen from "../Screens/ProductCatagoriesScreen";
import SellingScreen from "../Screen_Components/HomeScreen_Components/Selling";
import BidsOfferTabBar from "../Screen_Components/Bids_Offer_ Components/BidsOfferTabBar";
import SearchByImage from "../Screens/SearchByImage";

import { StyleSheet } from "react-native";
import { AuthContext } from "../ContextProvider/useAuth";

const Drawer = createDrawerNavigator();
function DrawerNav() {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: "royalblue",
        drawerLabelStyle: {
          fontWeight: "bold",
          marginHorizontal: -20,
          fontSize: 13,
        },
        drawerItemStyle: { marginVertical: 1 },
      }}
    >
      <Drawer.Group>
        <Drawer.Screen
          name="Stack"
          component={StackNav}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerItemStyle: { height: 40 },
            header: () => <StackNavHeader title={"Home"} />,
            drawerIcon: ({ focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
      </Drawer.Group>
      <Drawer.Group>
        <Drawer.Screen
          name="Notifications"
          component={NotificationTabbar}
          options={{
            header: () => {
              return <StackNavHeader title={"Notifications"} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Messages"
          component={MessagesTabBar}
          options={{
            header: () => {
              return <StackNavHeader title={"Messages"} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="email-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
            drawerItemStyle: { borderBottomWidth: 0.4 },
          }}
        />
        <Drawer.Screen
          name="SearchByImage"
          component={SearchByImage}
          options={{
            header: () => {
              return <StackNavHeader title={"Search By Image"} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
            title: "Search by Image",
          }}
        />
        <Drawer.Screen
          name="BidsOffers"
          component={BidsOfferTabBar}
          options={{
            header: () => {
              return <StackNavHeader title={"Bids and Offers"} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="hammer-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
            title: "Bids & offers",
          }}
        />
        <Drawer.Screen
          name="Purchases"
          component={PurchaseScreen}
          options={{
            header: () => {
              return <StackNavHeader title={`Purchaces`} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="cart-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Selling"
          component={SellingScreen}
          options={{
            header: () => {
              return <StackNavHeader title={`Selling`} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="tag-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            header: () => {
              return <StackNavHeader title={`${user?.username}'s Location`} />;
            },
            title: "Location",
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="location-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
            drawerItemStyle: { borderBottomWidth: 0.4 },
          }}
        />
        <Drawer.Screen
          name="ProductCatagories"
          component={ProductCatagoriesScreen}
          options={{
            header: () => {
              return <StackNavHeader title={`Catagories`} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="color-filter-outline"
                  size={30}
                  color={focused ? "royalblue" : color}
                />
              );
            },
            title: "Catagories",
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            header: () => {
              return <StackNavHeader title={"Settings"} />;
            },
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="settings-outline"
                  size={27}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Help"
          component={CustomerServiceScreen}
          options={{
            drawerIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name="help-circle-outline"
                  size={33}
                  color={focused ? "royalblue" : color}
                />
              );
            },
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

export default DrawerNav;

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
});
