import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const catagories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>Shipping, returns & payments</Text>
      </View>
      {/* ------------EstView */}
      <View style={styles.estView}>
        <View style={styles.leftTextView}>
          <Text style={styles.text2}>Est.delivery</Text>
        </View>
        <View style={styles.rightTextView}>
          <Text style={styles.text3}>Wed, Jun 22 - Tue, Jun 28</Text>
          <Text style={styles.text2}>From Minneapolis,</Text>
          <Text style={styles.text2}>Minnesota, United States</Text>
        </View>
      </View>
      {/* ----------Returns */}
      <View style={styles.estView}>
        <View style={styles.leftTextView}>
          <Text style={styles.text2}>Returns</Text>
        </View>
        <View style={styles.rightTextView}>
          <Text style={styles.text3}>Seller does not accept returns</Text>
          <Text style={styles.text2}>This item is covered by eBay</Text>
          <Text style={styles.text2}>Money Back Guarantee</Text>
        </View>
        <TouchableOpacity>
          <EvilIcons name="chevron-right" style={styles.Icon} />
        </TouchableOpacity>
      </View>

      {/* ---------------Payments */}
      <View style={styles.estView}>
        <View style={styles.leftTextView}>
          <Text style={styles.text2}>Payments</Text>
        </View>
        <View style={[styles.rightTextView, { flexDirection: "row" }]}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png",
              }}
            />
          </View>

          {/* --------Gpay logo */}
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: "https://indiapressrelease.com/wp-content/uploads/2020/11/Google-Pay-.jpg",
              }}
            />
          </View>

          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: "https://www.freelogovectors.net/wp-content/uploads/2016/12/visa-logo.png",
              }}
            />
          </View>

          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: "https://cdn.vox-cdn.com/thumbor/UKSLdttYoIK2bv1gd231rqL4eiQ=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13674554/Mastercard_logo.jpg",
              }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.textView, { marginTop: 20 }]}>
        <Text style={styles.text}>Shop with confidence</Text>
      </View>

      {/* -------------Top Rated Plus */}
      <View style={styles.ViewB}>
        <View style={styles.iconView}>
          <AntDesign name="star" style={styles.iconv2} color={"royalblue"} />
        </View>
        <View style={styles.textViewB}>
          <Text style={styles.textv2}>Top-rated Plus</Text>
          <Text style={[styles.text2, { marginTop: 2 }]}>
            Top-rated Plus. Trusted seller, fast shipping, and easy returns
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      {/* -------------eBay Money Back */}
      <View style={styles.ViewB}>
        <View style={styles.iconView}>
          <FontAwesome
            name="dollar"
            style={styles.iconv2}
            color={"royalblue"}
          />
        </View>
        <View style={styles.textViewB}>
          <Text style={styles.textv2}>eBay Money Back Guarantee</Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "85%" }}>
              <Text style={[styles.text2, { marginTop: 2 }]}>
                Get the item you ordered or your money back
              </Text>
            </View>
            <View
              style={{
                width: "15%",
              }}
            >
              <TouchableOpacity>
                <EvilIcons name="chevron-right" style={styles.Icon2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* ------------------------About Seller  */}

      <View style={[styles.textView, { marginTop: 20 }]}>
        <Text style={[styles.text, { fontSize: 28 }]}>About this seller</Text>
      </View>
      <View style={styles.sellerInfoView}>
        <View style={styles.profilePicView}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
          />
        </View>
        <View style={styles.otherInfoView}>
          <Text style={styles.text3}>fashion-up (69923)</Text>
          <Text style={styles.text2}>98.3% positive feedback</Text>
          <View style={styles.saveSeller}>
            <AntDesign name="hearto" style={styles.favIcon} />
            <Text style={styles.blueText}>Save this seller</Text>
          </View>
        </View>
        <TouchableOpacity>
          <EvilIcons name="chevron-right" style={styles.Icon2} />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />
      <View style={styles.Viewv3}>
        <Text style={[styles.blueText, { top: 6 }]}>Contact seller</Text>
      </View>

      <View style={styles.separator} />
      <View style={styles.Viewv3}>
        <Text style={[styles.blueText, { top: 6 }]}>Visit seller's store</Text>
      </View>

      <View style={styles.separator} />
    </View> /*containerView */
  );
};
const styles = StyleSheet.create({
  Viewv3: {
    width: "100%",
    height: 30,
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 15,
  },
  textView: {
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  estView: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  leftTextView: {
    width: "35%",
  },
  rightTextView: {
    width: "55%",
    flexDirection: "column",
  },

  text2: {
    color: "grey",
    fontSize: 15,
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    alignSelf: "flex-start",
  },
  imageView: {
    width: "23%",
    height: 25,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  Icon: {
    fontSize: 45,
    fontWeight: "100",
    top: 25,
  },
  Icon2: {
    fontSize: 55,
    fontWeight: "100",
  },
  ViewB: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  iconView: {
    width: "15%",
    alignItems: "center",
  },
  textViewB: {
    width: "85%",
    flexDirection: "column",
  },
  textv2: {
    fontSize: 15,
    fontWeight: "bold",
  },
  iconv2: {
    fontSize: 30,
    top: 10,
  },
  separator: {
    width: "100%",
    height: 0.5,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  sellerInfoView: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  profilePicView: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "90%",
    height: "100%",
    borderRadius: 90,
  },
  otherInfoView: {
    width: "55%",
    height: "100%",
    flexDirection: "column",
    paddingVertical: 10,
    marginLeft: 10,
  },
  blueText: {
    color: "royalblue",
    fontSize: 15,
    fontWeight: "500",
    bottom: 2,
  },
  saveSeller: {
    flexDirection: "row",
    marginVertical: 5,
    alignContent: "center",
  },
  favIcon: {
    color: "royalblue",
    fontSize: 17,
    fontWeight: "500",
    marginRight: 5,
  },
});

export default catagories;
