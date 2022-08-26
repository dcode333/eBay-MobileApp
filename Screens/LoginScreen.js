import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

import HSbutton from "../Screen_Components/HomeScreen_Components/HSbutton";
import { AuthContext } from "../ContextProvider/useAuth";
import {
  apiUserDetailFormatter,
  LogIn,
  GetUserDetail,
} from "../strapiDataFetcher/strapiDataFetcher";

const iniitialVals = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().trim().required("Enter the registered email"),
  password: Yup.string()
    .required("Plz set a Password")
    .min(6, "Password must be 5 chars"),
});

let navigation;
const LoginScreen = () => {
  navigation = useNavigation();
  const { setUser,user } = React.useContext(AuthContext);
  const [strapiLoginUser] = useMutation(LogIn);
  const [error, setError] = React.useState(null);
  const [secure, setSecure] = React.useState(true);
  const [strapiUserDetail, { data, loading, error: UserDetailError }] =
    useLazyQuery(GetUserDetail);

  useEffect(() => {
    if (data){ 
      setUser(apiUserDetailFormatter(data))
    console.log(user)
    };
  }, [data]);

  const strapiUserDetailCaller = async (id) => {
    await strapiUserDetail({
      variables: {
        id: id,
      },
    });
  };

  const strapiLoginUserCaller = async (email, password) => {
    try {
      const userResponse = await strapiLoginUser({
        variables: {
          identifier: email,
          password: password,
        },
      });
      if (userResponse) {
        strapiUserDetailCaller(userResponse.data.login.user.id);
      }
    } catch (error) {
      setError(error.message.toString());
    }
  };

  //=====================================UI======================================================

  if (loading || UserDetailError)
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {UserDetailError
            ? UserDetailError.message + "==>In Login Scren"
            : "Loading..."}
        </Text>
      </View>
    );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Welcome !!</Text>
        <View style={{ height: 180, width: 180, alignSelf: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAn9bEkuFHr2Oup7v3_Qs7WzhTrbVfHkWLew&usqp=CAU",
            }}
            resizeMode={"contain"}
            style={{ height: "100%", width: "100%", alignSelf: "center" }}
          />
        </View>

        <Formik
          initialValues={iniitialVals}
          onSubmit={(values) => {
            strapiLoginUserCaller(values.email, values.password);
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
                <TextInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    setFieldTouched("email");
                  }}
                  style={{
                    backgroundColor: "white",
                    width: 360,
                    alignSelf: "center",
                  }}
                  keyboardType={"email-address"}
                  autoFocus
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                />
                {touched.email && errors ? (
                  <Text style={styles.errorTextStyle}>{errors.email}</Text>
                ) : null}

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
                    marginTop: 20,
                  }}
                  theme={{
                    colors: {
                      primary: "royalblue",
                    },
                  }}
                  secureTextEntry={secure}
                  right={
                    <TextInput.Icon
                      name={!secure ? "eye" : "eye-off"}
                      onPress={() => setSecure(!secure)}
                    />
                  }
                />
                {touched.password && errors ? (
                  <Text style={styles.errorTextStyle}>{errors.password}</Text>
                ) : null}

                {error && <Text style={styles.errorTextStyle}>{error}</Text>}

                <HSbutton
                  backgroundColor={
                    !errors.email && !errors.password ? "royalblue" : "#BDBDBD"
                  }
                  text={"Sign in"}
                  textColor={"white"}
                  style={{ alignSelf: "center", marginTop: 30 }}
                  width={360}
                  height={48}
                  disable={!errors.email && !errors.password ? false : true}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.footer}>Create an account</Text>
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
    marginBottom: 20,
    // color:'#C4222E'
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
  errorTextStyle: {
    color: "red",
    marginLeft: 20,
  },
});
