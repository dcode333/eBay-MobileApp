import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../ContextProvider/useAuth";

let navigation;
const CustomDrawer = (props) => {
  navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 0.2, marginBottom: 10 }}
          onPress={() => navigation.navigate("UserAccount")}
        >
          <View style={[styles.center, { flex: 0.7 }]}>
            <Image
              source={{
                uri: user?.url,
              }}
              resizeMode={"cover"}
              style={styles.profileImage}
            />
          </View>
          <View style={[styles.center, styles.textHolder]}>
            <View style={{ flex: 0.7 }}>
              <Text numberOfLines={1} style={styles.text}>
                {user?.username}
              </Text>
            </View>
            <View style={{ flex: 0.3, alignItems: "center" }}>
              <Ionicons name="chevron-forward-outline" size={30} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.seperator} />

        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    height: 90,
    overflow: "hidden",
    width: 90,
    alignSelf: "flex-start",
    margin: 5,
    borderRadius: 50,
    borderWidth: 5,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 19,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 15,
  },
  textHolder: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  arrow: {
    left: 120,
    justifyContent: "center",
  },
  seperator: {
    height: 1,
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
  heading: {
    marginHorizontal: 15,
    fontWeight: "bold",
    color: "grey",
  },
});
