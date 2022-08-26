import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../ContextProvider/useAuth";

const isAvailible = (arrayToCheck, itemToCheck) => {
  return arrayToCheck.some(({ identity }) => {
    return identity === itemToCheck;
  });
};

const ListItem = ({
  uri,
  description,
  brandNew,
  rating,
  reviews,
  orgPrice,
  discPrice,
  country,
  watchers,
  sponsored,
  shipping,
  size,
  id,
  productId,
  seller,
}) => {
  const navigation = useNavigation();
  const discountPercentage = () =>
    Math.round(((orgPrice - discPrice) / orgPrice) * 100);
  const { wishList } = React.useContext(AuthContext);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          shipping,
          orgPrice,
          discPrice,
          description,
          uri,
          size,
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
              uri: uri[0],
            }} //1
            resizeMode={"contain"}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.text} /*2*/>{description}</Text>
          {brandNew && (
            <Text style={[styles.text, styles.textGrey]}>Brand New</Text>
          )}
        </View>
        {rating && (
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              reviews={[1, 2, 3, 4, 5]}
              defaultRating={rating} //3
              size={17}
              selectedColor={"black"}
              showRating={false}
              isDisabled={true}
              starStyle={{ marginHorizontal: 0, height: 16 }}
            />
            <Text
              style={[styles.text, styles.textGrey]}
            >{` (${reviews})`}</Text>
          </View>
        )}
        <View style={styles.ratingContainer}>
          <Text
            style={{ fontSize: 22, fontWeight: "bold" }}
          >{`$${orgPrice}`}</Text>
          {/*4*/}
        </View>
        {discPrice && (
          <View style={styles.ratingContainer}>
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: "line-through",
                fontWeight: "100",
                color: "#9E9E9E",
              }}
            >{`$${discPrice}`}</Text>
            <Text
              style={{ color: "#757575", fontSize: 15 }}
            >{` . ${discountPercentage()}% off`}</Text>
          </View>
        )}
        <View>
          <Text style={styles.belowDisc}>{`+$${
            (orgPrice * 25) / 100
          } shipping estimate\nfrom ${country}`}</Text>
          {/*5*/}
        </View>
        {watchers && (
          <Text style={styles.belowDisc}>{`${watchers}+ watchers`}</Text>
        )}
        {sponsored && (
          <Text
            style={[styles.belowDisc, { marginTop: 5 }]}
          >{`Sponsored`}</Text>
        )}
        <TouchableHighlight
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <FontAwesome
            name={isAvailible(wishList, id) ? "heart" : "heart-o"}
            size={17}
            color="royalblue"
          />
        </TouchableHighlight>
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    // height: 260,
    // width: "100%",
    backgroundColor: "#ECEFF1",
    elevation: 8,
    flexDirection: "row",
    padding: 10,
    borderRadius: 40,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    height: 140,
    width: 140,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#EFEBE9",
    overflow: "hidden",
    elevation: 5,
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
