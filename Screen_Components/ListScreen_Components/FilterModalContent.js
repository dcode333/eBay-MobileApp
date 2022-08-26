import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { AuthContext } from "../../ContextProvider/useAuth";
import AnimeModal from "./AnimeModal";

const FilterModal = ({ setFilterModal }) => {
  const { data, setData, demo } = React.useContext(AuthContext); //Here this is providing a global access to data
  const [animeModal, setAnimeModal] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setAnimeModal(false);
      setFilterModal(false);
    };
  }, []);
  let filter = () => {
    setFilterModal(false);
    setTimeout(() => {
      setData(
        data.filter((d) => {
          return d.discPrice > 500;
        })
      );
      reset;
    }, 500);
  };

  let filter2 = () => {
    setFilterModal(false);
    setTimeout(() => {
      setData(
        data.filter((d) => {
          return d.rating > 5;
        })
      );
      reset;
    }, 500);
  };

  let filter3 = () => {
    setFilterModal(false);
    setTimeout(() => {
      setData(
        data.filter((d) => {
          return d.stock > 20;
        })
      );
      reset;
    }, 500);
  };

  let filter4 = () => {
    setFilterModal(false);
    setTimeout(() => {
      setData(
        data.filter((d) => {
          return d.watchers > 300;
        })
      );
      reset;
    }, 500);
  };

  let filter5 = () => {
    setFilterModal(false);
    setTimeout(() => {
      setData(
        data.filter((d) => {
          return d.reviews > 3;
        })
      );
      reset;
    }, 500);
  };

  let reset = () => {
    setAnimeModal(true);
    setTimeout(() => {
      setAnimeModal(false);
    }, 1840);
    setTimeout(() => {
      setFilterModal(false);
    }, 2000);
    setTimeout(() => {
      setData([...demo]);
    }, 2600);
  };

  return (
    <View style={styles.parentCont}>
      <View style={styles.containerStyle}>
        <View style={styles.filterModalHeader}>
          <TouchableOpacity
            style={[styles.center, { flex: 0.3 }]}
            onPress={() => setFilterModal(false)}
          >
            <MaterialCommunityIcons
              name="close-thick"
              size={22}
              color="black"
            />
          </TouchableOpacity>
          <View style={[{ flex: 0.4 }, styles.center]}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Filter</Text>
          </View>
          <TouchableOpacity
            style={[{ flex: 0.4 }, styles.center]}
            // disabled={demoPopulateCheck ? false : true}
            onPress={() => reset()}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "royalblue",
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.filterModalHeader,
            styles.filterModalItemStyle,
            { flexDirection: "row" },
          ]}
          onPress={() => filter()}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ alignSelf: "flex-start", fontSize: 20, marginRight: 50 }}
            >
              Best Deals
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Octicons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterModalHeader,
            styles.filterModalItemStyle,
            { flexDirection: "row" },
          ]}
          onPress={() => filter2()}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ alignSelf: "flex-start", fontSize: 20, marginRight: 50 }}
            >
              Top Rated
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Octicons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterModalHeader,
            styles.filterModalItemStyle,
            { flexDirection: "row" },
          ]}
          onPress={() => filter3()}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ alignSelf: "flex-start", fontSize: 20, marginRight: 50 }}
            >
              In stock
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Octicons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterModalHeader,
            styles.filterModalItemStyle,
            { flexDirection: "row" },
          ]}
          onPress={() => filter4()}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ alignSelf: "flex-start", fontSize: 20, marginRight: 50 }}
            >
              Most Watched
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Octicons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterModalHeader,
            styles.filterModalItemStyle,
            { flexDirection: "row" },
          ]}
          onPress={() => filter5()}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ alignSelf: "flex-start", fontSize: 20, marginRight: 50 }}
            >
              Most Reviewed
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Octicons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <AnimeModal animeModal={animeModal} setAnimeModal={setAnimeModal} />
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  parentCont: {
    height: 800,
  },
  containerStyle: {
    position: "absolute",
    right: -20,
    height: 800,
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  filterModalHeader: {
    height: 50,
    width: "100%",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  listSeperator: {
    height: 1,
    width: "95%",
    marginBottom: 5,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
  },
  filterModalItemStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    width: 300,
    borderColor: "grey",
  },
});
