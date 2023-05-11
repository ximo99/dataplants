// import dependencies
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Toast } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (email === "" || name === "" || profession === "" || password === "") {
      setError("Please fill in your form correctly");
    } else {
      setError("");
      console.log("success");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      profession: profession,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            title: "Registration Succeeded",
            description: "Please login into your account",
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          title: "Error",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extraHeight={200}
          enableOnAndroid={true}
        >
          <FormContainer title={"Register"}>
            <Input
              placeholder={"Name"}
              name={"name"}
              id={"name"}
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Input
              placeholder={"User Email"}
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />

            <Input
              placeholder={"Password"}
              name={"password"}
              id={"password"}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <Input
              placeholder={"Profession"}
              name={"profession"}
              id={"profession"}
              value={profession}
              onChangeText={(text) => setProfession(text)}
            />

            <Input
              placeholder={"Country"}
              name={"profession"}
              id={"profession"}
              value={profession}
              onChangeText={(text) => setProfession(text)}
            />

            <View>{error ? <Error message={error} /> : null}</View>

            <View style={styles.buttonGroup}>
              <EasyButton primary large onPress={() => handleSubmit()}>
                <Text style={{ color: "white" }}>Register</Text>
              </EasyButton>
            </View>

            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
              <EasyButton
                secondary
                large
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={{ color: "white" }}>Back to Login</Text>
              </EasyButton>
            </View>
          </FormContainer>
        </KeyboardAwareScrollView>
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
});

export default Register;
