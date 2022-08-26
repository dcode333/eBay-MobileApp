import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import PasswordScreen from "../Screens/PasswordScreen";
import DrawerNav from "./DrawerNav";
import { AuthContext } from "../ContextProvider/useAuth";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const { user } = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group
          mode="modal"
          headerMode="none"
          screenOptions={{
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Sign in",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold",
                color: "royalblue",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Register",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold",
                color: "royalblue",
              },
            }}
          />
          <Stack.Screen
            name="Password"
            component={PasswordScreen}
            options={{
              title: "Register",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold",
                color: "royalblue",
              },
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNav;
