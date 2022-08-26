import {
  Text,
  Pressable,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HSbutton = ({
  height,
  width,
  borderColor,
  backgroundColor,
  textSize,
  textColor,
  borderWidth,
  text,
  style,
  onPress,
  disable,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disable}
      style={[
        {
          height: height ? height : 60,
          width: width ? width : 100,
          backgroundColor: backgroundColor ? backgroundColor : "red",
          borderRadius: height ? height / 2 : 30,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: borderWidth ? borderWidth : 0,
          borderColor: borderColor ? borderColor : "#5A75D4",
          margin: 5,
        },
        style,
      ]}
    >
      <TouchableOpacity onPress={onPress} disabled={disable}> 
        <Text
          style={{
            fontWeight: "bold",
            fontSize: textSize ? textSize : 20,
            color: textColor,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default HSbutton;
