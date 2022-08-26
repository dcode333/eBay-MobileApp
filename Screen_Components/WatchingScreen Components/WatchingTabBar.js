import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Active from "./Active";
import Ended from "./Ended";

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ActiveWatching"
        component={Active}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
          title: "Active",
          tabBarLabelStyle: { textTransform: "none" },
        }}
      />

      <Tab.Screen
        name="Ended"
        component={Ended}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
          title: "Ended",
          tabBarLabelStyle: { textTransform: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
