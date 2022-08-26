import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { quantity as numberOfItems } from "../Product_Detail_Screen_Component/dataSource";

let onChangeQuantity;
const CartCard = ({
  size,
  price,
  shipping,
  onPressb1,
  onPressb2,
  description,
  uri,
  quantity,
  b1,
  b2,
  id,
  setCartArray,
  cartArray,
}) => {
  const [openQ, setOpenQ] = useState(false);
  const [valueQ, setValueQ] = useState(quantity);
  const [itemsQ, setItemsQ] = useState(numberOfItems);

  onChangeQuantity = () => {
    setCartArray(
      cartArray.map((x) => {
        if (x.identity !== id) return x;
        else return { ...x, quantity: valueQ };
      })
    );
  };

  return (
    <Pressable style={styles.contain}>
      <View style={styles.container}>
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
          <View style={{ marginTop: 5 }}>
            <Text style={styles.text} /*2*/>{description}</Text>
          </View>
          <Text style={styles.textGrey}>{size}</Text>
          {quantity ? (
            <Text style={styles.textGrey}>{`Qty: ${valueQ}`}</Text>
          ) : null}
          <Text style={styles.textGrey}>New with Box</Text>
          <Text style={styles.text}>{`\nUS $${price}`}</Text>
          <Text style={styles.textGrey}>{`+ US $${shipping} Shipping `}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.remove} onPress={onPressb1}>
          <Text style={styles.footerText}>{b1}</Text>
        </Pressable>
        <Pressable style={styles.remove} onPress={onPressb2}>
          <Text style={styles.footerText}>{b2}</Text>
        </Pressable>
      </View>
      {quantity ? (
        <DropDownPicker
          open={openQ}
          placeholder={"Qty"}
          value={valueQ}
          items={itemsQ}
          setOpen={setOpenQ}
          onChangeValue={() => onChangeQuantity()}
          setValue={setValueQ}
          setItems={setItemsQ}
          containerStyle={{
            width: 80,
            height: 5,
            position: "absolute",
            right: 20,
            top: 70,
          }}
          dropDownDirection="BOTTOM"
          listMode="SCROLLVIEW"
          dropDownContainerStyle={{
            width: 80,
            height: 60,
          }}
        />
      ) : null}
    </Pressable>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  footer: {
    height: 50,
    width: "100%",
    // backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    // width: "100%",
    // backgroundColor: "tomato",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 0.3,
    // backgroundColor: "black",
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    elevation:8
  },
  detailContainer: {
    flex: 0.6,
    // backgroundColor: "royalblue",
    flexDirection: "column",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto",
    marginRight: 5,
    // backgroundColor:'red'
  },
  textGrey: {
    color: "#9E9E9E",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  remove: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 18,
    color: "royalblue",
    fontWeight: "bold",
  },
  contain: {
    width: 380,
    marginTop: 10,
    alignSelf: "center",
    // backgroundColor: "red",
    borderRadius:20,
    marginLeft:5,
    elevation:10,
    backgroundColor: "#FAFAFA",
  },
});
