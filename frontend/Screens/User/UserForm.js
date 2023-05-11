// import dependencies
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Item, CheckIcon, Picker, Toast, Select, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import UserProfile from "./UserProfile";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";
import statusConservation from "../../assets/data/status.json";

// import context API
import UserContext from "../../Context/UserContext";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const UserForm = (props) => {
  const userContext = useContext(UserContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [country, setCountry] = useState();
  const [profession, setProfession] = useState();
  const [photoUser, setPhotoUser] = useState();

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${baseURL}users/${userContext.user?.userId}`,
        {
          name,
          email,
          password,
          country,
          profession,
          photoUser,
        }
      );

      if (response.status === 200) {
        Toast.show({
          text: "Profile updated.",
          description: "The profile is updated to the DB.",
          status: "success",
          duration: 2000,
          isClosable: true,
          type: "success",
        });

        setTimeout(() => {
          props.navigation.navigate("User Profile");
        }, 500);
      }
    } catch (error) {
      Toast.show({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <View backgroundColor="#515760" height="100%">
      <FormContainer title="Edit your profile">
        <View style={styles.label}>
          <Text style={styles.text}>Name:</Text>
        </View>
        <Input
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Email:</Text>
        </View>
        <Input
          name="email"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Password:</Text>
        </View>
        <Input
          name="password"
          id="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <View style={styles.label}>
          <Text style={styles.text}>Country:</Text>
        </View>
        <Input
          name="country"
          id="country"
          value={country}
          onChangeText={(text) => setCountry(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Profession:</Text>
        </View>
        <Input
          name="profession"
          id="profession"
          value={profession}
          onChangeText={(text) => setProfession(text)}
        />


        <View style={styles.buttonContainer}>
          <EasyButton primary large onPress={() => updateProfile()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    margin: 10,
  },
  text: {
    fontSize: 15,
    color: colors.grey,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#e0e0e0",
    backgroundColor: colors.background,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  input: {
    height: 60,
    marginBottom: 20,
    marginHorizontal: 12,
    borderRadius: 20,
    paddingVertical: 7,
    backgroundColor: colors.grey,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default UserForm;
