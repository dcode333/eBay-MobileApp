import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../ContextProvider/useAuth";

const MyActivityIndicator = () => {
  const { loader } = React.useContext(AuthContext);

  return (
    <ActivityIndicator
      size={50}
      style={{ position: "absolute", top: 340, alignSelf: "center" }}
      color={"royalblue"}
      animating={loader}
    />
  );
};

export default MyActivityIndicator;
