import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Fontisto, MaterialIcons } from "react-native-vector-icons";
import { TextInput, Switch } from "react-native-paper";
import HSbutton from '../../Screen_Components/HomeScreen_Components/HSbutton'
import {useNavigation} from '@react-navigation/native'
let navigation
const App = ({ route }) => {
  const [isEnable, setIsEnabled] = useState(false);
  const { address, } = route.params;
  const toggleSwitch = () => setIsEnabled(!isEnable);
  navigation=useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.noteContainer}>
        <Fontisto name="locked" size={20} />
        <Text style={styles.note}>
          Your payment is secure. Your card details will not be shared with
          sellers.
        </Text>
      </View>

      <TextInput
        placeholder="Card Number"
        autoFocus
        style={styles.expireInput}
        mode="outlined"
        right={
          <TextInput.Icon
            name="camera-outline"
            size={30}
            style={{ marginRight: 15 }}
          />
        }
      />

      <TextInput
        label="Expiration date"
        style={styles.expireInput}
        mode="outlined"
        placeholder="MM/YY"
      />

      <TextInput
        label="Security Code"
        style={styles.expireInput}
        mode="outlined"
        placeholder="3 or 4 digits"
      />

      <View style={styles.rememberContainer}>
        <View style={styles.rememberNoteContainer}>
          <Text style={styles.rememberNote}>
            Remember this card for future orders
          </Text>
        </View>
        <Switch
          thumbColor="royalblue"
          onValueChange={toggleSwitch}
          value={isEnable}
        />
      </View>
      <View>
        <View style={styles.billingTitleContainer}>
          <Text style={styles.billingTitle}>Billing address</Text>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.address}>
            <Text>{address}</Text>
          </View>
          <View style={styles.addressIconContainer}>
            <MaterialIcons name="article" size={35} color="royalblue" />
          </View>
        </View>
      </View>
      <HSbutton
          // disable={paymentOption ? false : true}
          backgroundColor={"royalblue"}
          text={'Done'}
          width={360}
          style={{ alignSelf: "center" }}
          textColor={"white"}
          height={50}
          onPress={()=>navigation.navigate("CheckoutScreen")}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  noteContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  note: {
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 18,
  },
  expireInput: {
    borderColor: "black",
    width: "100%",
    marginVertical: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 15,
  },
  rememberNoteContainer: {
    width: "80%",
    justifyContent: "center",
  },
  rememberSwitch: {
    justifyContent: "center",
    width: "20%",
    alignItems: "flex-end",
  },
  rememberNote: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    width: "50%",
    marginVertical: 10,
  },
  billingTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  billingTitleContainer: {
    marginTop: 30,
  },
  addressContainer: {
    width: "100%",
    flexDirection: "row",
  },
  addressIconContainer: {
    alignItems: "flex-end",
    width: "50%",
  },
});

export default App;
