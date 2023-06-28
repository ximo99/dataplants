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

// import context API
import UserContext from "../../Context/UserContext";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";
import statusConservation from "../../assets/data/status.json";
import countries from "../../assets/data/countries.json";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const PostForm = (props) => {
  const userContext = useContext(UserContext);

  const [pickerValueSpecie, setPickerValueSpecie] = useState();
  const [pickerValueLocation, setPickerValueLocation] = useState();
  const [species, setSpecies] = useState([]);
  const [specie, setSpecie] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [item, setItem] = useState(null);


  
  useEffect(() => {
    // species
    axios
      .get(`${baseURL}species`)
      .then((res) => setSpecies(res.data))
      .catch((error) => alert("Error to load species"));

    // image picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setSpecies([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const addPost = () => {
    if (specie == "" || description == "" || location == "") {
      setError("Please fill in the form correctly");
    }

    const newImageUri = "file:///" + image.split("file:/").join("");

    let formData = new FormData();

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    formData.append("specie", specie);
    formData.append("description", description);
    formData.append("location", location);
    setUser(userContext.user.userId);
    formData.append("user", userContext.user.userId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${baseURL}posts`, formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            title: "Added post.",
            description: "The new posts was added to the DB.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          setTimeout(() => {
            props.navigation.navigate("Post Container");
          }, 500);
        }
      })
      .catch((error) => {

        //console.error(error.response);
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
    <View backgroundColor="#515760" height="100%">
      <FormContainer title="Add new post">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon style={{ color: "white" }} name="camera" />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text style={styles.text}>Scientific name:</Text>
        </View>
        <VStack alignItems="center" space={4} style={styles.input}>
          <Select
            mode="dropdown"
            iosIcon={<Icon name="chevron-down-outline" />}
            style={{ width: undefined }}
            minWidth="83%"
            borderWidth={0}
            fontSize={14}
            placeholder="Select the scientific name of the specie"
            selectedValue={pickerValueSpecie}
            onValueChange={(e) => [setPickerValueSpecie(e), setSpecie(e)]}
          >
            {species.map((c) => {
              return (
                <Select.Item
                  key={c._id}
                  label={c.scientific_name}
                  value={c._id}
                />
              );
            })}
          </Select>
        </VStack>

        <View style={styles.label}>
          <Text style={styles.text}>Description:</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
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
            name="location"
            id="location"
            value={location}
            placeholder={location ? location : "Select the location"}
            selectedValue={pickerValueLocation}
            onValueChange={(e) => [setPickerValueLocation(e), setLocation(e)]}
          >
            {countries.map((c) => {
              return <Select.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Select>
        </VStack>

        {err ? <Error message={message} /> : null}

        <View style={styles.buttonContainer}>
          <EasyButton primary large onPress={() => addPost()}>
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
    backgroundColor: "#B0B0B0",
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

export default PostForm;
