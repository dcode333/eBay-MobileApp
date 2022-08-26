import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import HorizantalListItem from "../CatagoryScreen_Components/HorizantalListItem";
import { useNavigation } from "@react-navigation/native";
import CatagoryScreenData, {
  catagory,
} from "../CatagoryScreen_Components/CatagoryScreenData";

const Catagories = () => {
  const navigation = useNavigation();
  // const { apiData, setData, setDemo } = React.useContext(AuthContext);
  return (
    <View style={{ width: "100%" }}>
      <View style={{flexDirection:'row'}}>
        <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 10 }}>
          Explore Popular catagories
        </Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => navigation.navigate("ProductCatagories")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        data={catagory}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => {
          return (
            <HorizantalListItem
              title={item.title}
              containerStyle={{ marginTop: 0 }}
              width={120}
              height={180}
              uri={item.uri}
              onPress={() => {
                navigation.navigate("Catagories", {
                  title: item.title,
                  CatagoryScreenData: CatagoryScreenData[item.id],
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Catagories;

const styles = StyleSheet.create({
  seeAll: {
    fontSize: 16,
    fontWeight: "bold",
    color: "royalblue",
    marginLeft: 45,
    marginVertical: 12 
  },
});
