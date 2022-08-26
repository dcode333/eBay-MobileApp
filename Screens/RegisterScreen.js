import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";

const iniitialVals = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNo: "",
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .trim()
    .required("Enter the registered email")
    .label("Email"),
  firstName: Yup.string().required("Enter your First Name").label("First Name"),
  lastName: Yup.string()
    .required("Enter your Last Name ")
    .label("Last Name"),
  phoneNo: Yup.string()
    .required("Enter a valid Phone No")
    .min(11)
    .max(11)
    .label("Phone No"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [imgURL, setImageURL] = useState("");

  const selectImage = async () => {
    try {
      const sel = await ImagePicker.launchImageLibraryAsync();
      setImageURL(sel.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={iniitialVals}
          onSubmit={(values) => {
            navigation.navigate("Password", {
              email: values.email,
              lastName: values.lastName,
              firstName: values.firstName,
              imgURL,
              phoneNo: values.phoneNo,
            });
          }}
          validationSchema={schema}
        >
          {({
            handleChange,
            errors,
            handleSubmit,
            touched,
            setFieldTouched,
          }) => {
            return (
              <>
                <Text style={styles.header}>Lets get started!</Text>
                <TextInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  style={{
                    backgroundColor: "white",
                    width: 360,
                    alignSelf: "center",
                  }}
                  onBlur={() => {
                    setFieldTouched("email");
                  }}
                  keyboardType={"email-address"}
                  autoFocus
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                />
                {touched.email && errors && (
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "flex-start",
                      marginHorizontal: 15,
                    }}
                  >
                    {errors.email}
                  </Text>
                )}

                <TextInput
                  label="First Name"
                  onChangeText={handleChange("firstName")}
                  onBlur={() => {
                    setFieldTouched("firstName");
                  }}
                  style={{
                    backgroundColor: "white",
                    width: 360,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                />
                {touched.firstName && errors && (
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "flex-start",
                      marginHorizontal: 15,
                    }}
                  >
                    {errors.firstName}
                  </Text>
                )}
                <TextInput
                  label="Last Name"
                  onBlur={() => {
                    setFieldTouched("lastName");
                  }}
                  onChangeText={handleChange("lastName")}
                  style={{
                    backgroundColor: "white",
                    width: 360,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                />
                {touched.lastName && errors && (
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "flex-start",
                      marginHorizontal: 15,
                    }}
                  >
                    {errors.lastName}
                  </Text>
                )}
                <TextInput
                  label="Phone No"
                  onBlur={() => {
                    setFieldTouched("phoneNo");
                  }}
                  onChangeText={handleChange("phoneNo")}
                  keyboardType={"number-pad"}
                  style={{
                    backgroundColor: "white",
                    width: 360,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                />
                {touched.phoneNo && errors && (
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "flex-start",
                      marginHorizontal: 15,
                      marginBottom: 10,
                    }}
                  >
                    {errors.phoneNo}
                  </Text>
                )}

                <HSbutton
                  text={imgURL ? "Uploaded" : "Upload Image"}
                  textColor={"white"}
                  style={{ alignSelf: "center", marginTop: 20 }}
                  width={360}
                  height={44}
                  onPress={() => {
                    selectImage();
                  }}
                />

                <HSbutton
                  backgroundColor={
                    !errors.email &&
                    !errors.firstName &&
                    !errors.lastName &&
                    imgURL &&
                    !errors.phoneNo
                      ? "royalblue"
                      : "#BDBDBD"
                  }
                  text={"Continue"}
                  textColor={"white"}
                  style={{ alignSelf: "center" }}
                  width={360}
                  height={44}
                  disable={
                    !errors.email &&
                    !errors.firstName &&
                    !errors.lastName &&
                    imgURL &&
                    !errors.phoneNo
                      ? false
                      : true
                  }
                  onPress={() => handleSubmit()}
                />
              </>
            );
          }}
        </Formik>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "center" }}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Text style={styles.footer}>Already a member? </Text>
          <Text style={{ alignSelf: "center", color: "royalblue" }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    margin: 20,
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "black",
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginLeft: 16,
    fontSize: 12.5,
  },
});
