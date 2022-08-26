import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../ContextProvider/useAuth";
let navigation;
const UserAccount = () => {
  navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  return (
    <View>
      <View style={styles.contain}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}
        >
          <Image
            source={{
              uri: user?.url,
            }}
            resizeMode={"cover"}
            style={styles.profileImage}
          />
        </View>
        <View style={{ flex: 0.7, justifyContent: "center" }}>
          <Text>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text>{`(${0}) No feedback`}</Text>
          <Text>{`Member Since: ${2022}`}</Text>
          <Text>{`Contact: ${user?.phoneNo}`}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.feedback}
        onPress={() => navigation.navigate("TabBar")}
      >
        <Text
          style={{ marginHorizontal: 15, fontSize: 22, fontWeight: "bold" }}
        >
          {"Recent feedback Ratings\t\t\t\t >>>"}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="add-circle"
          size={20}
          color={"green"}
          style={{ margin: 20 }}
        />
        <Text style={{ fontWeight: "bold" }}>Positive</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="scan-circle"
          size={20}
          color={"grey"}
          style={{ margin: 20 }}
        />
        <Text style={{ fontWeight: "bold" }}>Neutral</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="alert-circle"
          size={20}
          color={"red"}
          style={{ margin: 20 }}
        />
        <Text style={{ fontWeight: "bold" }}>Negative</Text>
      </View>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  contain: {
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
  profileImage: {
    height: 90,
    overflow: "hidden",
    width: 90,
    alignSelf: "flex-start",
    margin: 10,
    borderRadius: 50,
    borderWidth: 5,
  },
  feedback: {
    width: "100%",
    marginTop: 100,
    flexDirection: "row",
  },
});
