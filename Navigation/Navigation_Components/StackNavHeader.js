import { StyleSheet, View, Text, StatusBar, Pressable } from "react-native";
import React from "react";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../ContextProvider/useAuth";
import { useNavigation } from "@react-navigation/native";

const StackNavHeader = ({ title }) => {
  const { demo, cartNotification } = React.useContext(AuthContext);
  const navigation = useNavigation();
  //BUG !!! in demo
  //see Bug as demo[0] is giving undefined

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={[
          styles.openDrwerIcon,
          styles.center,
          {
            marginHorizontal: 10,
          },
        ]}
      >
        <Octicons name="three-bars" size={20} style={{ borderRadius: 20 }} />
      </Pressable>
      <Pressable style={{ height: 40, width: 175, justifyContent: "center" }}>
        <Text style={styles.text} numberOfLines={1}>
          {title ? title : `${"eBay"}`}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.openDrwerIcon, styles.center]}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <Octicons name="search" size={22} style={{ borderRadius: 20 }} />
      </Pressable>
      <Pressable
        style={[styles.openDrwerIcon, styles.center]}
        onPress={() => navigation.navigate("WatchingTabBar")}
      >
        <MaterialCommunityIcons
          name="shopping-outline"
          size={22}
          style={{ borderRadius: 20 }}
        />
      </Pressable>
      <Pressable
        style={[styles.openDrwerIcon, styles.center]}
        onPress={() => {
          navigation.navigate("ShoppingItem");
        }}
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={22}
          style={{ borderRadius: 20 }}
        />
        {cartNotification !== 0 && (
          <View style={styles.CartNotifier}>
            <Text style={styles.CartNotifierText}>{cartNotification}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default StackNavHeader;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    height: 60,
    width: "100%",
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  openDrwerIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#EEEEEE",
    borderRadius: 25,
    marginHorizontal: 5,
  },
  CartNotifier: {
    borderRadius: 9,
    height: 18,
    width: 18,
    backgroundColor: "red",
    position: "absolute",
    top: 2,
    right: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  CartNotifierText: {
    color: "white",
    fontWeight: "700",
    fontSize: 10,
  },
});
