import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HSbutton from "./HSbutton";

const Register_Login = () => {
  return (
    <View style={styles.cont}>
      <View style={styles.textHolder}>
        <Text style={styles.text}>
          Sign in so we can personalize your experience
        </Text>
      </View>
      <View style={styles.buttonHolder}>
        <HSbutton
          height={45}
          width={150}
          backgroundColor={"transparent"}
          textColor={"#5A75D4"}
          text={"Register"}
          borderWidth={1}
          
        />
        <HSbutton
          height={45}
          width={150}
          backgroundColor={"transparent"}
          textColor={"#5A75D4"}
          text={"Sign in"}
          borderWidth={1}

        />
      </View>
    </View>
  );
};

export default Register_Login;

const styles = StyleSheet.create({
  cont: {
    height: 120,
    width: "90%",
    alignSelf:'center',
    marginBottom:10
  },
  textHolder: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "#6C6C6C",
  },
  buttonHolder: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
