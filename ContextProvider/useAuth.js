import React, { createContext } from "react";

export const AuthContext = createContext({});

const GlobalDataProvider = ({ children }) => {
  //=====================Global data===================================

  const [checkout, setCheckout] = React.useState([]);
  const [wishList, setWishList] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [saveForlater, setSaveForlater] = React.useState([]);
  const [cartNotification, setCartNotification] = React.useState(0);
  const [demo, setDemo] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [userLocation, setUserLocation] = React.useState(null);
  const [loader, setloader] = React.useState(false);
  const [cartArray, setCartArray] = React.useState([]);

  return (
    <AuthContext.Provider
      value={{
        demo,
        setDemo,
        cartArray,
        setCartArray,
        data,
        setData,
        cartNotification,
        setCartNotification,
        user,
        setUser,
        saveForlater,
        setSaveForlater,
        checkout,
        setCheckout,
        loader,
        setloader,
        wishList,
        setWishList,
        userLocation,
        setUserLocation,
      }}
    >
      {/*Everything wrapped inside the AuthProvider will be availible to children*/}

      {children}
    </AuthContext.Provider>
  );
};

export default GlobalDataProvider;
