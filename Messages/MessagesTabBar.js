import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Archive from "./Archive";
import Inbox from "./Inbox";
import Sent from "./Sent";

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar() {
  return (
    <Tab.Navigator>
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarStyle: {
              width: 300,
              backgroundColor: "#F5F5F5",
              shadowColor: "white",
              marginHorizontal: 10,
            },
          }}
        />
      <Tab.Screen
        name="Archive"
        component={Archive}
        options={{
          tabBarStyle: {
            width: 300,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 10,
          },
        }}
      />


      <Tab.Screen
        name="Sent"
        component={Sent}
        options={{
          tabBarStyle: {
            width: 300,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
}
