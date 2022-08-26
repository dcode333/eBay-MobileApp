import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LogBox } from "react-native";

import MyActivityIndicator from "./loader/Loader";
import GlobalDataProvider from "./ContextProvider/useAuth";
import AuthStackNavigator from "./Navigation/AuthStackNav";

//SP20-BCS-135

const client = new ApolloClient({
  uri: `https://ebay-clone-backend.herokuapp.com/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      SaveForLater: {
        fields: {
          userId: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <GlobalDataProvider>
            <AuthStackNavigator />
            <MyActivityIndicator />
          </GlobalDataProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
