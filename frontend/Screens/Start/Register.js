// import dependencies
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox, HStack, Toast, Select, VStack } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";
import countries from "../../assets/data/countries.json";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [pickerValueCountry, setPickerValueCountry] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = () => {
    if (
      email === "" ||
      name === "" ||
      profession === "" ||
      country === "" ||
      password === ""
    ) {
      setError("Please fill in your form correctly");
      return; // Return here if there's an error.
    } else {
      setError("");
      console.log("success");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      profession: profession,
      country: country,
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

  const toggleTerms = () => {
    setShowTerms(!showTerms);
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

            <VStack alignItems="center" space={4} style={styles.inputCountry}>
              <Select
                mode="dropdown"
                iosIcon={<Icon name="chevron-down-outline" />}
                style={{ width: undefined, color: "black" }}
                minWidth="83%"
                borderWidth={0}
                fontSize={14}
                name="country"
                id="country"
                value={country}
                placeholder={"Select your country"}
                selectedValue={pickerValueCountry}
                onValueChange={(e) => [setPickerValueCountry(e), setCountry(e)]}
              >
                {countries.map((c) => {
                  return (
                    <Select.Item key={c.code} label={c.name} value={c.name} />
                  );
                })}
              </Select>
            </VStack>

            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <HStack
                alignItems="center"
                space={2}
              >
                <Checkbox
                  aria-label="accept-conditions"
                  isChecked={!buttonDisabled}
                  onChange={() => setButtonDisabled(!buttonDisabled)}
                  value={buttonDisabled}
                  colorScheme={buttonDisabled ? "white" : "cyan"}
                />
                <Text style={{ color: "white" }}>
                  I agree with the terms and conditions
                </Text>
              </HStack>

              {showTerms ? (
                <Text style={{ color: colors.primary }} onPress={toggleTerms}>
                  Read less
                </Text>
              ) : (
                <Text style={{ color: colors.primary }} onPress={toggleTerms}>
                  Read more
                </Text>
              )}
            </View>

            {showTerms && (
              <Text style={{ color: "white", marginBottom: 20, marginHorizontal: 20, textAlign: "justify" }}>
                The management of the application undertakes to collect the data strictly necessary for its operation and also to make responsible use of it. It also undertakes to delete said data as soon as its use is not necessary. The application includes measures to guarantee the security, integrity and confidentiality of the users who make use of it and their respective data. More information at: info@dataplants.com.
              </Text>
            )}

            <View>{error ? <Error message={error} /> : null}</View>

            <View style={styles.buttonGroup}>
              <EasyButton
                primary
                large
                onPress={() => handleSubmit()}
                disabled={buttonDisabled}
                style={{ opacity: buttonDisabled ? 0.4 : 1 }}
              >
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
  inputCountry: {
    height: 60,
    marginHorizontal: 12,
    marginBottom: 25,
    borderRadius: 20,
    paddingVertical: 7,
    backgroundColor: colors.grey,
  },
});

export default Register;
