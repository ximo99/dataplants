// import dependencies
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

// import navigators
import Main from "../../Navigators/Main";

// import context API
import AuthGlobal from "../../Context/store/AuthGlobal";

// import actions
import { loginUser } from "../../Context/actions/Auth.actions";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// import data
import colors from "../../assets/common/colors";

const Login = (props) => {
  const context = useContext(AuthGlobal);
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
      loginUser(user, context.dispatch);
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
