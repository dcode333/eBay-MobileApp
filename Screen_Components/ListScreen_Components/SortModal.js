import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthContext } from "../../ContextProvider/useAuth";

let demo = [];

const sorting = [
  {
    id: 4,
    title: "Best Match",
    sortingAlgo: (setData) => {
      demo.sort((a, b) => {
        return b.discPrice - a.discPrice;
      });
      setData(demo);
    },
  },
  {
    id: 1,
    title: "Highest Price + Shipping",
    sortingAlgo: (setData) => {
      demo.sort((a, b) => {
        return b.orgPrice - a.orgPrice;
      });
      setData(demo);
    },
  },
  {
    id: 2,
    title: "Lowest Price + Shipping",
    sortingAlgo: (setData) => {
      demo.sort((a, b) => {
        return a.orgPrice - b.orgPrice;
      });
      setData(demo);
    },
  },
  {
    id: 3,
    title: "Ending Soonest",
    sortingAlgo: (setData) => {
      demo.sort((a, b) => {
        return a.stock - b.stock;
      });
      setData(demo);
    },
  },
  {
    id: 4,
    title: "Newly Listed",
    sortingAlgo: (setData) => {
      demo.sort((a, b) => {
        let bDate = new Date(b.listedDate);
        let aDate = new Date(a.listedDate);
        return bDate.getFullYear() - aDate.getFullYear();
      });
      setData(demo);
    },
  },
];

const SortModal = ({ sortModalVisible, setSortModalVisible }) => {
  const [modalChoice, setModalChoice] = React.useState(null);
  const { data, setData } = React.useContext(AuthContext); //Here this is providing a global access to data
  demo = [...data];
  return (
    <View>
      <BottomSheet
        visible={sortModalVisible}
        onBackButtonPress={() => setSortModalVisible(!sortModalVisible)}
        onBackdropPress={() => setSortModalVisible(!sortModalVisible)}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.modalDragger} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 15,
              marginVertical: 20,
            }}
          >
            Sort
          </Text>
          <FlatList
            data={sorting}
            extraData={sorting}
            keyExtractor={(item) => {
              item.id;
            }}
            ItemSeparatorComponent={() => <View style={styles.listSeperator} />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: "100%",
                    marginLeft: 20,
                    flexDirection: "row",
                    marginVertical: 5,
                  }}
                  onPress={() => {
                    setSortModalVisible(!sortModalVisible);
                    setModalChoice(item.id); //for changing the one pressed(not working)
                    setTimeout(() => {
                      item.sortingAlgo(setData);
                    }, 700);
                  }}
                >
                  <MaterialIcons
                    name={
                      item.id === modalChoice
                        ? "radio-button-checked"
                        : "arrow-forward-ios"
                    }
                    size={20}
                    color={item.id === modalChoice ? "blue" : "black"}
                  />
                  <Text style={{ marginLeft: 15 }}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "40%",
  },
  modalDragger: {
    height: 3,
    width: 25,
    alignSelf: "center",
    backgroundColor: "grey",
    borderRadius: 2.5,
    marginTop: 4,
  },
  listSeperator: {
    height: 1,
    width: "93%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
});
