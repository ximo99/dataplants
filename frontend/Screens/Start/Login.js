// import dependencies
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

// import navigators
import Main from "../../Navigators/Main";

// import context API
import AuthGlobal from "../../Context/store/AuthGlobal";
import UserContext from "../../Context/UserContext";

// import actions
import { loginUser } from "../../Context/actions/Auth.actions";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// import data
import colors from "../../assets/common/colors";
import baseURL from "../../assets/common/baseUrl";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated == true) {
      props.navigation.navigate("Main");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      //loginUser(user, context.dispatch);
      fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // if response contains token, store it in AsyncStorage and set current user
          if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token);
            const decoded = jwt_decode(token);
            userContext.setUser(decoded);
            props.navigation.navigate("Main");
          } else {
            // if response doesn't contain token, set error
            //logOutUser(dispatch);
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.show({
            title: "Error",
            text: "Please provide correct credentials.",
            type: "danger",
            duration: 3000,
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FormContainer title={"Login"}>
          <Input
            placeholder={"User Email"}
            name={"email"}
            id={"email"}
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />

          <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
            <EasyButton primary large onPress={() => handleSubmit()}>
              <Text style={{ color: "white" }}>Login</Text>
            </EasyButton>
          </View>

          <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
            <Text style={styles.middleText}>Don't have an account yet?</Text>
            <EasyButton
              secondary
              large
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={{ color: "white" }}>Register</Text>
            </EasyButton>
          </View>
        </FormContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  innerContainer: {
    width: "100%",
  },
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
    color: "white",
  },
});

export default Login;
