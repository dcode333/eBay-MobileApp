import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterModalContent from "../Screen_Components/ListScreen_Components/FilterModalContent";
const StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="ModalScreen"
        component={FilterModalContent}
        options={{
          title: "Modal",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
            color: "royalblue",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
