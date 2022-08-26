import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserAccountAsBuyer from "../Screens/UserAccountAsBuyer";
import UserAccountCatagory from "../Screens/UserAccountAsSeller";

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Seller"
        component={UserAccountCatagory}
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
        name="Buyer"
        component={UserAccountAsBuyer}
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
