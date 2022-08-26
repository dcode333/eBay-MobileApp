import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Active from "./Active";
import DidNotWin from "./DidNotWin";

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Active"
        component={Active}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
          tabBarLabelStyle: { textTransform: "none" },
        }}
      />

      <Tab.Screen
        name="DidNotWin"
        component={DidNotWin}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
          title: "Didn't win",
          tabBarLabelStyle: { textTransform: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
