import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Pressable,
  Linking,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../ContextProvider/useAuth";

const DATA = [
  {
    title: "Account",
    data: ["Sign out"],
  },
  {
    title: "general",
    data: ["Theme", "Country or Region", "Translation", "Clear history"],
  },
  {
    title: "Support",
    data: ["Customer Service"],
  },
  {
    title: "About",
    data: ["User Agreement", "Privacy", "Legal"],
  },
];

const Item = ({ title }) => (
  <Pressable style={styles.item} onPress={() => ListItemOnPress(title)}>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);
let navigation;
let signOutUser;
let ListItemOnPress;

const App = () => {
  navigation = useNavigation();
  const { setUser, userLocation } = React.useContext(AuthContext);
  ListItemOnPress = (title) => {
    switch (title) {
      case "Sign out":
        signOutUser();
        break;
      case "Customer Service":
        navigation.navigate("Help");
        break;
      case "User Agreement":
        Linking.openURL(
          "https://www.ebay.com/help/policies/member-behaviour-policies/user-agreement?id=4259"
        );
      case "Privacy":
        Linking.openURL(
          "https://www.ebay.com/help/policies/member-behaviour-policies/user-privacy-notice-privacy-policy?id=4260"
        );
        break;
      case "Theme":
        Alert.alert("More Themes coming !", "Stay Tuned");
        break;
      case "Country or Region":
        Alert.alert(
          `You are currently accessing from: ${userLocation?.city} ${userLocation?.region} ${userLocation?.country}`
        );
        break;
      default:
      // code block
    }
  };
  signOutUser = () => {
    setUser(null);
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Item title={item} signOutUser={signOutUser} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    fontSize: 14,
    marginHorizontal: 10,
    color: "royalblue",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
  listSeperator: {
    height: 1,
    width: "95%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
});

export default App;
