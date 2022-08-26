import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Menu = ({ icon, title, selected, setSelected, navigation, nav }) => {
  return (
    <Pressable
      style={[
        styles.c1_1,
        { backgroundColor: selected === title ? "black" : "#E0E0E0" },
      ]}
      onPress={() => {
        setSelected(title);
        navigation.navigate(nav);
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={20}
        style={{ marginLeft: 15 }}
        color={selected === title ? "#E0E0E0" : "black"}
      />
      <Text
        style={[
          styles.c1_1_text,
          { color: selected === title ? "#E0E0E0" : "black" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
export default Menu;

const styles = StyleSheet.create({
  c1_1: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    alignSelf: "center",
    marginHorizontal: 5,
    borderRadius: 18,
    flexDirection: "row",
  },
  c1_1_text: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 5,
    marginRight: 15,
  },
});
