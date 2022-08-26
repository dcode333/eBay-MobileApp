import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActNow from "./ActNow";
import SeeMore from "./SeeMore";


const Tab = createMaterialTopTabNavigator();

export default function TopTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Act Now"
        component={ActNow}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
        }}
      />

      <Tab.Screen
        name="See More"
        component={SeeMore}
        options={{
          tabBarStyle: {
            width: 200,
            backgroundColor: "#F5F5F5",
            shadowColor: "white",
            marginHorizontal: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
}
