import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../ContextProvider/useAuth";
import { DeleteWishList } from "../../strapiDataFetcher/strapiDataFetcher";
import { useMutation } from "@apollo/client";

let onPress;
const ActiveWishListCard = ({
  uri,
  description,
  orgPrice,
  discPrice,
  shipping,
  id,
  productId,
  seller,
  wishListId,
}) => {
  const navigation = useNavigation();
  const [removeWishListStrapi] = useMutation(DeleteWishList);
  const { wishList, setWishList } = React.useContext(AuthContext);

  const wishListRemover = async () =>
    await removeWishListStrapi({ variables: { id: wishListId } });

  onPress = () => {
    try {
      wishListRemover();
    } catch (error) {
      console.log(e);
    }
    setWishList(
      wishList.filter((x) => {
        return x.identity !== id;
      })
    );
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          shipping,
          orgPrice,
          discPrice: !discPrice ? null : discPrice, //see if error
          description,
          uri: [uri],
          id,
          productId,
          seller,
        })
      }
    >
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image
            source={{
              uri: uri,
            }} //1
            resizeMode={"contain"}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={{ marginTop: 5, marginRight: 5 }}>
          <Text style={styles.text} /*2*/>{description}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text
            style={{ fontSize: 22, fontWeight: "bold" }}
          >{`$${orgPrice}`}</Text>
          {/*4*/}
        </View>

        <View>
          <Text style={styles.belowDisc}>{`+$${
            (orgPrice * 25) / 100
          } shipping estimate`}</Text>
        </View>
        <TouchableOpacity style={styles.remove} onPress={() => onPress()}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ActiveWishListCard;

const styles = StyleSheet.create({
  remove: {
    alignSelf: "flex-end",
    margin: 10,
    marginRight: 25,

  },
  removeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "royalblue",
  },
  container: {
    margin: 8,
    flexDirection: "row",
    // height: 160,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    paddingTop: 5,
  },
  imageContainer: {
    flex: 0.4,
    // backgroundColor: "black",
  },
  image: {
    height: 140,
    width: 140,
    // alignSelf: "center",
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 7,
    marginLeft: 5,
  },
  detailContainer: {
    flex: 0.6,
    // backgroundColor: "royalblue",
    flexDirection: "column",
    marginLeft: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  textGrey: {
    color: "#9E9E9E",
    fontFamily: "Roboto",
  },
  ratingContainer: {
    // flex: 0.15,
    // backgroundColor: "orange",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  belowDisc: { color: "#9E9E9E", fontSize: 15 },
});
