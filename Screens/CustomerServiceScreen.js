import { View, Text, Linking } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const CustomerServiceScreen = () => {
  React.useEffect(() => {
    Linking.openURL("https://www.ebay.com/help/home");
  },);

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Button
        icon="arrow-bottom-right"
        mode="contained"
        onPress={() => Linking.openURL("https://www.ebay.com/help/home")}
        color={"royalblue"}
      >
        Customer Care
      </Button>
    </View>
  );
};

export default CustomerServiceScreen;
