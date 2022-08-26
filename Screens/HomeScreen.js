import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useQuery } from "@apollo/client";
import LoottieView from "lottie-react-native";

import {
  FetchWishListProducts,
  apiWishListFormatter,
  FetchCartProducts,
  apiCartDataFormatter,
} from "../strapiDataFetcher/strapiDataFetcher";
import StrapiProducts from "../ContextProvider/StrapiProducts";
import SuggessionView from "../Screen_Components/HomeScreen_Components/SuggessionView";
import BestDealsList from "../Screen_Components/HomeScreen_Components/BestDealsList";
import WatchedItemsList from "../Screen_Components/WatchingScreen Components/WatchedItemsList";
import Catagories from "../Screen_Components/HomeScreen_Components/Catagories";
import { AuthContext } from "../ContextProvider/useAuth";
import { useNavigation } from "@react-navigation/native";
import Menu from "../Screen_Components/HomeScreen_Components/Menu";
import SearchBar from "../Screen_Components/HomeScreen_Components/SearchBar";

const menuItems = [
  { title: "Stores", icon: "tag-outline", nav: "Selling" },
  { title: "Catagories", icon: "apps", nav: "ProductCatagories" },
  { title: "Purchases", icon: "shopping-outline", nav: "Purchases" },
  {
    title: "Saved",
    icon: "checkbox-multiple-marked-circle-outline",
    nav: "ShoppingItem",
  },
];

//============================Main COMPONENT====================================================

let navigation;
const HomeScreen = () => {
  const { wishList, setWishList, user, setCartArray, setCartNotification } =
    React.useContext(AuthContext);
  const [selected, setSelected] = React.useState();
  const [isSplashing, setIsSplashing] = React.useState(false);
  navigation = useNavigation();

  const {
    data: wishListData,
    loading,
    error,
  } = useQuery(FetchWishListProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user.id,
    },
  });

  const {
    data: CartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery(FetchCartProducts, {
    fetchPolicy: "cache-and-network",
    variables: {
      userId: user?.id,
    },
  });

  React.useEffect(() => {
    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 2500);

    if (CartData) {
      setCartArray(apiCartDataFormatter(CartData));
      setCartNotification(apiCartDataFormatter(CartData).length);
    }

    if (wishListData) {
      setWishList(apiWishListFormatter(wishListData));
    }

    return () => setIsSplashing(false);
  }, [wishListData, CartData]);

  if (loading || error)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {error ? error.message + " ==> In HomeScreen " : " "}
        </Text>
      </View>
    );

  if (cartLoading || cartError)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {cartError ? cartError.message + "  => In Home screen" : " "}
        </Text>
      </View>
    );

  if (isSplashing) {
    return (
      <LoottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("../assets/load.json")}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        nestedScrollEnabled={true}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.c1}>
          <FlatList
            horizontal
            data={menuItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <Menu
                  title={item.title}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                  navigation={navigation}
                  nav={item.nav}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.c2}>
          <SearchBar />
        </View>
        {wishList.length !== 0 && (
          <View style={styles.c5}>
            <WatchedItemsList deals={wishList} title={"Your Watched Items"} />
          </View>
        )}
        {/* <Register_Login /> */}
        <SuggessionView
          backgroundColor={"#E9FF77"}
          buttonColor={"#364F03"}
          boldText={"Explore Daily Deals Here"}
          lightText={"Find everything you need for home sweet home"}
          buttonText={"Get them now"}
          buttonTextColor={"#E9FF77"}
        />
        <View style={styles.c5}>
          <BestDealsList
            deals={StrapiProducts.filter((x) => x.identity < 30)}
            title={"Daily Deals"}
          />
        </View>
        <SuggessionView
          backgroundColor={"#C9E43B"}
          buttonColor={"#364F03"}
          boldText={"Refresh Your Home"}
          lightText={
            "Immerse yourself in plants, and get to know how they behave"
          }
          buttonText={"Explore Now"}
          buttonTextColor={"#E9FF77"}
        />
        <ImageBackground
          source={{
            uri: "https://i.ebayimg.com/images/g/zDUAAOSwuyNiV~0h/s-l960.webp",
          }}
          style={{ height: 150, width: "100%" }}
          resizeMode={"contain"}
        />
        <View style={styles.c5}>
          <BestDealsList
            deals={StrapiProducts.filter(
              (x) => x.seller === "Apple" || x.seller === "Samsung"
            )}
            title={"Popular in Smartphones"}
          />
        </View>
        <View style={styles.c7}>
          <ScrollView horizontal>
            <Catagories />
          </ScrollView>
        </View>
        <SuggessionView
          backgroundColor={"#EF5350"}
          boldText={"Enjoy upto 50% off on Watches"}
          lightText={"See popular watches below"}
          buttonText={"Search more"}
          buttonTextColor={"#fff"}
          headingColor={"#fff"}
          // textColor={"#fff"}
          buttonColor={"#F44336"}
        />
        <View style={styles.c5}>
          <BestDealsList
            deals={StrapiProducts.filter(
              (x) => x.seller === "Tissot" || x.seller === "Casio"
            )}
            title={"Popular in Watches"}
          />
        </View>
        <SuggessionView
          backgroundColor={"#BDBDBD"}
          boldText={"Buy it while you can"}
          lightText={"New Deals at surprising sale is waiting for you"}
          buttonText={"Explore Now"}
          buttonColor={"#BDBDBD"}
        />
        <View style={styles.c5}>
          <BestDealsList
            deals={StrapiProducts.filter(
              (x) => x.seller === "Coins" || x.seller === "Antiques"
            )}
            title={"Popular in Collectables"}
          />
        </View>
        <SuggessionView
          backgroundColor={"#FFECB3"}
          boldText={"Most watched Beauty Items"}
          lightText={"Shop New Beauty products here"}
          buttonText={"Shop Now"}
          buttonColor={"#FFD54F"}
        />
        <View style={styles.c5}>
          <BestDealsList
            deals={StrapiProducts.filter(
              (x) => x.seller === "Masks" || x.seller === "Scrubs"
            )}
            title={"Popular in Beauty products"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  c1: {
    height: 48,
    width: "95%",
    justifyContent: "center",
    marginLeft: 10,
  },
  c2: {
    height: 60,
    width: "95%",
    // backgroundColor: "grey",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  c5: {
    alignSelf: "center",
    width: "100%",
    marginLeft: 10,
    marginTop: 10,
  },
  c7: {
    height: 380,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },

  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "royalblue",
  },
});
export default HomeScreen;
