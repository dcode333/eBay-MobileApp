import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("screen").width;

export default StyleSheet.create({
  dropDownTitle: {
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
    fontWeight: "bold",
  },
  dotStyle: {
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor: "black",
  },
  desc: {
    fontWeight: "bold",
    fontSize: 22,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  cont: {
    width: screenWidth,
    marginTop: 30,
  },
  counter: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 60,
    backgroundColor: "grey",
    position: "absolute",
    right: 0,
    borderRadius: 6,
    margin: 8,
    opacity: 0.9,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  dots: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
  },
  heart: {
    height: 35,
    width: 35,
    borderRadius: 25,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position:'absolute',
    top:-30,
    backgroundColor:'white',
    elevation:8,
    right:10
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 27,
    marginHorizontal: 15,
  },
  greyText: {
    right: 12,
    fontSize: 16,
    marginTop: 12,
    color: "grey",
  },
  discText: {
    color: "grey",
    fontSize: 14,
  },
  deliveryText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  shoeSize: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginTop: 10,
    flexDirection: "row",
  },
  Pagination: {
    height: 20,
    width: 60,
    alignSelf: "center",
  },
});
