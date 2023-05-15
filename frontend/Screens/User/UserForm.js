// import dependencies
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Box, Item, CheckIcon, Picker, Toast, Select, VStack } from "native-base";
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
import countries from "../../assets/data/countries.json";

// import context API
import UserContext from "../../Context/UserContext";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const UserForm = (props) => {
  const userContext = useContext(UserContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [profession, setProfession] = useState();
  const [photoUser, setPhotoUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}users/${userContext.user?.userId}`)
      .then((res) => {
        const user = res.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setCountry(user.country || "");
        setProfession(user.profession || "");
        setPhotoUser(user.photoUser || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${baseURL}users/${userContext.user?.userId}`,
        {
          name,
          email,
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

        // Luego, cambia el valor de refresh para disparar la actualización de los datos.
        userContext.setRefresh(!userContext.refresh);

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
    <>
      {loading == false ? (
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
          <Text style={styles.text}>Country:</Text>
        </View>
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
            placeholder={country ? country : "Select your country"}
            placeholderTextColor={"#000"}
            selectedValue={pickerValue}
            onValueChange={(e) => [setPickerValue(e), setCountry(e)]}
          >
            {countries.map((c) => {
              return <Select.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Select>
        </VStack>

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
    </View>) : (
        //Loading
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          bgColor="#515760"
        >
          <ActivityIndicator
            size="large"
            backgroundColor="#515760"
            color="#5cb85c"
          />
        </Box>
      )}
    </>
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
  inputCountry: {
    height: 60,
    marginHorizontal: 12,
    marginBottom: 25,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginBottom: 20,
    width: '80%',
  },
  icon: {
    flex: 1,
  }
});

export default UserForm;
