import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { createUser } from "../strapiDataFetcher/strapiDataFetcher";
import { Formik } from "formik";
import * as Yup from "yup";

const iniitialVals = {
  userName: "",
  password: "",
  confirmPassword: "",
};

const schema = Yup.object().shape({
  userName: Yup.string().required("Enter User Name").label("User Name"),
  password: Yup.string()
    .required("Plz set a Password")
    .min(6, "Password must be atleast 6 charachters"),
  confirmPassword: Yup.string()
    .required("Plz confirm the password once more")
    .equals([Yup.ref("password")], "Password Does not match"),
});

const PasswordScreen = ({ route }) => {
  const { email, firstName, lastName, phoneNo, imgURL } = route.params;
  // console.log(email, firstName, lastName, phoneNo, imgURL);
  const navigation = useNavigation();
  const [error, setError] = React.useState(null);
  const [strapiCreateUser] = useMutation(createUser);

  const strapiCreateUserCaller = async (
    email,
    password,
    firstName,
    lastName,
    url,
    userName,
    phoneNo,
    confirmed
  ) => {
    try {
      await strapiCreateUser({
        variables: {
          email,
          password,
          firstName,
          lastName,
          url,
          userName,
          phoneNo,
          confirmed,
        },
      });
      navigation.replace("Login") 
    } catch (e) {
      console.log(e.message.toString())
      setError(e.message.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lets's Finish... </Text>

      <Formik
        initialValues={iniitialVals}
        onSubmit={(values) => {
          strapiCreateUserCaller(
            email,
            values.password,
            firstName,
            lastName,
            imgURL,
            values.userName,
            phoneNo,
            true
          );
          // !error ? navigation.replace("Login") : console.log(error);
        }}
        validationSchema={schema}
      >
        {({ handleChange, errors, handleSubmit, touched, setFieldTouched }) => {
          return (
            <>
              <TextInput
                label="User Name"
                onChangeText={handleChange("userName")}
                onBlur={() => {
                  setFieldTouched("userName");
                }}
                style={{
                  backgroundColor: "white",
                  width: 360,
                  alignSelf: "center",
                }}
                theme={{
                  colors: {
                    primary: "royalblue",
                  },
                }}
              />
              {touched.userName && errors && (
                <Text style={styles.errorTextStyle}>{errors.userName}</Text>
              )}

              <TextInput
                label="Password"
                onChangeText={handleChange("password")}
                onBlur={() => {
                  setFieldTouched("password");
                }}
                style={{
                  backgroundColor: "white",
                  width: 360,
                  alignSelf: "center",
                  marginTop: 15,
                }}
                theme={{
                  colors: {
                    primary: "royalblue",
                  },
                }}
                secureTextEntry={true}
              />
              {touched.password && errors && (
                <Text style={styles.errorTextStyle}>{errors.password}</Text>
              )}
              <TextInput
                label="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => {
                  setFieldTouched("confirmPassword");
                }}
                style={{
                  backgroundColor: "white",
                  width: 360,
                  alignSelf: "center",
                  marginTop: 15,
                }}
                theme={{
                  colors: {
                    primary: "royalblue",
                  },
                }}
                secureTextEntry={true}
              />
              {touched.confirmPassword && errors && (
                <Text style={styles.errorTextStyle}>
                  {errors.confirmPassword}
                </Text>
              )}
              {error && <Text style={styles.errorTextStyle}>{error}</Text>}

              <HSbutton
                backgroundColor={
                  !errors.confirmPassword &&
                  !errors.userName &&
                  !errors.password
                    ? "royalblue"
                    : "#BDBDBD"
                }
                text={"Create Account"}
                textColor={"white"}
                style={{ alignSelf: "center", marginTop: 15 }}
                width={360}
                height={48}
                disable={
                  !errors.confirmPassword &&
                  !errors.userName &&
                  !errors.password 
                    ? false
                    : true
                }
                onPress={() => handleSubmit()}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  header: {
    margin: 20,
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "royalblue",
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginLeft: 16,
    fontSize: 12.5,
    marginBottom: 15,
  },
  errorTextStyle: {
    color: "red",
    alignSelf: "flex-start",
    marginHorizontal: 15,
  },
});
