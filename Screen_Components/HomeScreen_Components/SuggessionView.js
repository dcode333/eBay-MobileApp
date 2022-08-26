import { Text, View } from "react-native";
import React from "react";
import HSbutton from "./HSbutton";
import { useNavigation } from "@react-navigation/native";

let navigation;
const SuggessionView = ({
  height,
  boldText,
  lightText,
  backgroundColor,
  buttonText,
  buttonColor,
  buttonTextColor,
  style,
  headingColor,
  textColor
}) => {
  navigation = useNavigation();

  return (
    <View
      style={[{
        height: height ? height : 160,
        width: "100%",
        backgroundColor: backgroundColor ? backgroundColor : "grey",
        marginVertical: 0,
      },{style}]}
    >
      <View
        style={{
          flex: 0.6,
          marginHorizontal: 15,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20,color:headingColor }}>{boldText}</Text>
      </View>
      <View style={{ marginHorizontal: 15, justifyContent: "center" }}>
        <Text style={{ fontSize: 16,color:textColor }}>{lightText}</Text>
      </View>
      <View
        style={{
          flex: 0.4,
          marginHorizontal: 10,
          marginVertical: 5,
          justifyContent: "center",
        }}
      >
        <HSbutton
          text={buttonText}
          backgroundColor={buttonColor}
          height={40}
          width={80}
          textSize={12}
          onPress={() => navigation.navigate("SearchScreen")}
          textColor={buttonTextColor}
          style={{elevation:10}}
        />
      </View>
    </View>
  );
};

export default SuggessionView;
