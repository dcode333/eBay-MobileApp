import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CatagoryScreen({
  HorizantalListItem,
  VerticalListItem,
  CatagoryScreenData,
  title,
}) {
  const navigation = useNavigation();

  const [data, setData] = React.useState(CatagoryScreenData);

  const renderMainItem = ({ item }) => {
    if (item.type === "row") {
      return (
        <Pressable
      
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
          onPress={() => {
            navigation.navigate("eBay", { title,filterBase:item.filterBase });
          }}
        >
          <VerticalListItem uri={item.text} />
        </Pressable>
      );
    }

    if (item.type === "list") {
      return (
        <View style={styles.list}>
          <FlatList
            extraData={data}
            data={item.data}
            keyExtractor={keyExtractor}
            renderItem={renderHorizontalItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  const renderHorizontalItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.horizontalItem}
        onPress={() => {
          navigation.navigate("eBay", { title });
        }}
      >
        <HorizantalListItem title={item.title} uri={item.uri} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <Text style={styles.heading}>
                {`What's Hot in ${title} right now`}
              </Text>
            </View>
          );
        }}
        extraData={data}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderMainItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainItem: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "yellow",
  },
  horizontalItem: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  list: {
    height: 140,
    marginHorizontal: 2,
    // backgroundColor:'tomato',
  },
});
