import React, { useState } from "react";
import { Text, View, ScrollView, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../ContextProvider/useAuth";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../Screen_Components/Product_Detail_Screen_Component/CarouselCardItem";
import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import styles from "../Screen_Components/Product_Detail_Screen_Component/ProductDetailScreenStyles";
import {
  sizes,
  quantity,
  color,
} from "../Screen_Components/Product_Detail_Screen_Component/dataSource";
import {
  CreateCart,
  CreateWishList,
  DeleteFromSaveForLater,
  DeleteWishList,
} from "../strapiDataFetcher/strapiDataFetcher";
import GeneralDescription from "../Screen_Components/Product_Detail_Screen_Component/GeneralDescription";
import ProductDetail from "../Screen_Components/Product_Detail_Screen_Component/ProductDetail";

const discountPercentage = (orgPrice, discPrice) =>
  Math.round(((orgPrice - discPrice) / orgPrice) * 100);

let navigation;
let addTocart;
let CheckoutSetter;
let addToWishList;
let isAvailible;
export default function ProductDetailScreen({ route }) {
  const {
    orgPrice,
    discPrice,
    shipping,
    description,
    uri,
    id,
    productId,
    seller,
  } = route.params;
  const [addCarttoStrapi] = useMutation(CreateCart);
  const [addWishListToStrapi] = useMutation(CreateWishList);
  const [removeWishListFromStrapi] = useMutation(DeleteWishList);
  const [RemoveSaveForLaterFromStrapi] = useMutation(DeleteFromSaveForLater);
  navigation = useNavigation();
  const {
    cartNotification,
    setCartNotification,
    saveForlater,
    setSaveForlater,
    setCheckout,
    wishList,
    setWishList,
    cartArray,
    setCartArray,
    user,
  } = React.useContext(AuthContext);
  
  const [pagginationCount, setpagginationCount] = React.useState(0);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [productSize, setProductSize] = useState(null);
  const [items, setItems] = useState(sizes);
  const [openQ, setOpenQ] = useState(false);
  const [productQuantity, setProducttQuantity] = useState(null);
  const [availibleQuantity, setavailibleQuantity] = useState(quantity);
  const [openC, setOpenC] = useState(false);
  const [productColor, setproductColor] = useState(null);
  const [itemsC, setItemsC] = useState(color);
  const isCarousel = React.useRef(null);

  //=================================Functions===================================================
  isAvailible = (arrayToCheck, itemToCheck) => {
    return arrayToCheck.some(({ identity }) => {
      return identity === itemToCheck;
    });
  };

  let isDisabled = () => {
    if (isAvailible(wishList, id)) return true;
    else return false;
  };

  const saveForLaterRemover = async (id) =>
    await RemoveSaveForLaterFromStrapi({ variables: { id: id } });

  let saveForLaterRemoverIfItemIsPresent = () => {
    let itemTofind = saveForlater.find((x) => x.productId === productId);
    if (itemTofind) saveForLaterRemover(itemTofind.id);
  };

  addToWishList = () => {
    addWishListtoStrapiCaller();
    setWishList(
      wishList.concat([
        {
          orgPrice: orgPrice,
          shipping: shipping,
          uri: uri[0],
          description: description,
          identity: id,
          ...(discPrice && { discPrice }),
        },
      ])
    );
  };

  const addCarttoStrapiCaller = async () => {
    try {
      await addCarttoStrapi({
        variables: {
          productId: productId,
          userId: user.id,
          quantity: parseInt(productQuantity),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------------------------------------------------------
  const addWishListtoStrapiCaller = async () => {
    try {
      await addWishListToStrapi({
        variables: {
          productId: productId,
          userId: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // ---------------------------------------------------------------------------------------------------------

  addTocart = (id) => {
    if (productQuantity) {
      setCartNotification(cartNotification + 1);
      setSaveForlater(saveForlater.filter((c) => c.identity !== id));
      saveForLaterRemoverIfItemIsPresent();
      addCarttoStrapiCaller();
      setCartArray(cartArray.concat([{ identity: id }]));
    } else Alert.alert("No quanity selected !!", "Plz select a quantity");
  };

  CheckoutSetter = () => {
    if (productQuantity) {
      setCheckout([
        {
          description: description,
          identity: id,
          price: orgPrice,
          uri: uri[0],
          size: productSize,
          quantity: productQuantity,
          shipping: shipping,
          productId: productId,
        },
      ]);
      navigation.navigate("CheckoutScreen");
    } else Alert.alert("Fill all the Fields !!", "Plz select a quantity");
  };
  //====================================================================================

  return (
    <ScrollView>
      {/*================================================================================ */}

      <View style={{ height: 380, width: "100%" }}>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={uri}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => {
            setpagginationCount(index);
          }}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
      <View style={styles.Pagination}>
        <Pagination
          dotsLength={uri.length}
          activeDotIndex={pagginationCount}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <View style={styles.counter}>
        <Text style={styles.text}>{`${pagginationCount + 1} of ${
          uri.length
        }`}</Text>
        {/*Here uri.length*/}
      </View>
      {/*================================================================================ */}

      <View style={styles.dots}>
        <Pressable
          style={styles.heart}
          onPress={() => addToWishList()}
          disabled={isDisabled()}
        >
          <Ionicons
            name={isAvailible(wishList, id) ? "heart" : "heart-outline"}
            size={25}
            color={"royalblue"}
          />
        </Pressable>
      </View>
      <View>
        <Text style={styles.desc}>{description} </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.priceText}>{`$${orgPrice}`}</Text>
        <Text style={styles.greyText}>{`+ $${shipping} shipping`}</Text>
      </View>
      {discPrice && (
        <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
          <Text style={styles.discText}>{`Was`}</Text>
          <Text
            style={[styles.discText, { textDecorationLine: "line-through" }]}
          >{` US $${discPrice}`}</Text>
          <Text style={styles.discText}>{`  ${discountPercentage(
            orgPrice,
            discPrice
          )}% Off`}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 15,
          marginVertical: 5,
        }}
      >
        <Text style={{ fontSize: 15 }}>Est. delivery </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {`Fri, May 6 - Sat, May 15`}
        </Text>
      </View>

      {/*===handle size of shoes condition========================================== */}

      {seller === "Nike" ||
      seller === "Adidas" ||
      seller === "Puma" ||
      seller === "Converse" ? (
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.shoeSize, { marginTop: 20 }]}>
            <Text style={styles.dropDownTitle}>Size:</Text>
          </View>
          <DropDownPicker
            open={sizeDropdownOpen}
            placeholder={"Select a Size"}
            value={productSize}
            items={items}
            setOpen={setSizeDropdownOpen}
            setValue={setProductSize}
            setItems={setItems}
            containerStyle={{
              width: 230,
              marginLeft: 75,
              marginTop: 10,
            }}
            dropDownContainerStyle={{
              width: 200,
            }}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
          />
        </View>
      ) : null}

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.shoeSize, { marginTop: 20 }]}>
          <Text style={styles.dropDownTitle}>Quantity:</Text>
        </View>
        <DropDownPicker
          open={openQ}
          placeholder={"Select Quantity"}
          value={productQuantity}
          items={availibleQuantity}
          setOpen={setOpenQ}
          setValue={setProducttQuantity}
          // onChangeValue={() => onChangeQuantity()}
          setItems={setavailibleQuantity}
          containerStyle={{
            width: 230,
            marginLeft: 47,
            marginTop: 10,
          }}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          dropDownContainerStyle={{
            width: 200,
          }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.shoeSize, { marginTop: 20 }]}>
          <Text style={styles.dropDownTitle}>Color:</Text>
        </View>
        <DropDownPicker
          open={openC}
          placeholder={"Select a Color"}
          value={productColor}
          items={itemsC}
          setOpen={setOpenC}
          setValue={setproductColor}
          setItems={setItemsC}
          containerStyle={{
            width: 230,
            marginLeft: 68,
            marginTop: 10,
            flexDirection: "row",
          }}
          dropDownContainerStyle={{
            width: 200,
          }}
          listMode="SCROLLVIEW"
          dropDownDirection="TOP"
        />
      </View>

      {/*================================================================================ */}

      <HSbutton
        backgroundColor={"royalblue"}
        style={{ alignSelf: "center", marginTop: 30 }}
        height={44}
        width={350}
        text={"Buy it now"}
        textColor={"#fff"}
        onPress={() => {
          CheckoutSetter();
        }}
      />
      <HSbutton
        backgroundColor={"transparent"}
        borderWidth={1.5}
        style={{ alignSelf: "center" }}
        height={44}
        width={350}
        text={isAvailible(cartArray, id) ? "Added" : "Add to Cart"}
        textColor={isAvailible(cartArray, id) ? "grey" : "royalblue"}
        disable={isAvailible(cartArray, id) ? true : false}
        onPress={() => {
          addTocart(id);
        }}
      />
      <HSbutton
        backgroundColor={"transparent"}
        borderWidth={1.5}
        style={{ alignSelf: "center" }}
        height={44}
        width={350}
        text={
          isAvailible(wishList, id) ? "Added to WishList" : "Add to WishList"
        }
        textColor={isAvailible(wishList, id) ? "grey" : "royalblue"}
        disable={isAvailible(wishList, id) ? true : false}
        onPress={() => addToWishList()}
      />
      <ProductDetail description={description} itemNumber={id} />
      <GeneralDescription />
    </ScrollView>
  );
}
