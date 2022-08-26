import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "react-native-vector-icons";



export default function ProductDetail(props) {
  const [remainingQuantity,setremainingQuantity]=React.useState(Math.floor(Math.random() * 500))



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>About this item</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={{ width: "80%" }}>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTitle}>Item details</Text>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.name}>
              <Text style={{ ...styles.text, color: "#9C9C9C" }}>
                Condition
              </Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text}>
                {props.condition ? props.condition : "New"}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.name}>
              <Text style={{ ...styles.text, color: "#9C9C9C" }}>Quantity</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text}>
                {props.quantity
                  ? props.quantity
                  :remainingQuantity}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.name}>
              <Text style={{ ...styles.text, color: "#9C9C9C" }}>
                Item Number
              </Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text}>{props.itemNumber}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.name}>
              <Text style={{ ...styles.text, color: "#9C9C9C" }}>
                Country/Region of Manufacture
              </Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text}>
                {props.country ? props.country : "United States"}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.name}>
              <Text style={{ ...styles.text, color: "#9C9C9C" }}>
                Number of Minutes
              </Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.text}>
                {props.minutes ? props.minutes : "Unlimited"}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialIcons name="verified" size={30} color={"royalblue"} />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={styles.textDescription}>
          <View>
            <Text style={styles.detailTitle}>
              Item description from the seller
            </Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>{props.description}</Text>
          </View>
        </View>

        <TouchableOpacity style={{ ...styles.iconContainer, width: "10%" }}>
          <MaterialIcons name="description" size={30} color={"royalblue"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: 15,
    flexDirection: "row",
  },
  name: {
    width: "45%",
    marginRight: "10%",
  },
  value: {
    width: "45%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  detailContainer: {
    marginVertical: 20,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "black",
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detailTextContainer: {
    marginVertical: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    width: "100%",
  },
  textDescription: {
    width: "90%",
  },
});
