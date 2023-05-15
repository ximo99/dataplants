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

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const SpecieForm = (props) => {
  const userContext = useContext(UserContext);

  const [pickerValue, setPickerValue] = useState();
  const [scientific_name, setScientificName] = useState();
  const [common_name, setCommonName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState();
  const [division, setDivision] = useState();
  const [family, setFamily] = useState();
  const [gender, setGender] = useState();
  const [state_conservation, setStateConservation] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

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
      setCategories([]);
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

  const addSpecie = () => {
    if (scientific_name == "" || common_name == "" || description  == "" || category == "" || division == "" || family == "" || gender == "" || state_conservation == "" ) {
      setError("Please fill in the form correctly");
    }

    const newImageUri = "file:///" + image.split("file:/").join("");

    let formData = new FormData();

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    formData.append("scientific_name", scientific_name);
    formData.append("common_name", common_name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("division", division);
    formData.append("family", family);
    formData.append("gender", gender);
    formData.append("state_conservation", state_conservation);
    setUser(userContext.user.userId);
    formData.append("user", userContext.user.userId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    //// LLEVAR
    setUser(userContext.user.userId)
    
    axios
        .post(`${baseURL}species`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              title: "Added Specie.",
              description: "The new specie was added to the DB.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });

            setTimeout(() => {
              props.navigation.navigate("Specie Container");
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
  }

  return (
    <View backgroundColor="#515760" height="100%">
      <FormContainer title="Add new specie">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon style={{ color: "white" }} name="camera" />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text style={styles.text}>Scientific name:</Text>
        </View>
        <Input
          placeholder="Scientific name"
          name="scientific_name"
          id="scientific_name"
          value={scientific_name}
          onChangeText={(text) => setScientificName(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Common name:</Text>
        </View>
        <Input
          placeholder="Common name"
          name="common_name"
          id="common_name"
          value={common_name}
          onChangeText={(text) => setCommonName(text)}
        />

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
          <Text style={styles.text}>Category:</Text>
        </View>
        <VStack alignItems="center" space={4} style={styles.input}>
          <Select
            mode="dropdown"
            iosIcon={<Icon name="chevron-down-outline" />}
            style={{ width: undefined }}
            minWidth="83%"
            borderWidth={0}
            fontSize={14}
            placeholder="Select the Specie Category"
            selectedValue={pickerValue}
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Select.Item key={c._id} label={c.name} value={c._id} />;
            })}
          </Select>
        </VStack>

        <View style={styles.label}>
          <Text style={styles.text}>Division:</Text>
        </View>
        <Input
          placeholder="Division"
          name="division"
          id="division"
          value={division}
          onChangeText={(text) => setDivision(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Family:</Text>
        </View>
        <Input
          placeholder="Family"
          name="family"
          id="family"
          value={family}
          onChangeText={(text) => setFamily(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Gender:</Text>
        </View>
        <Input
          placeholder="Gender"
          name="gender"
          id="gender"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />

        <View style={styles.label}>
          <Text style={styles.text}>Status conservation:</Text>
        </View>
        <VStack alignItems="center" space={4} style={styles.input}>
          <Select
            selectedValue={state_conservation}
            minWidth="83%"
            borderWidth={0}
            fontSize={14}
            accessibilityLabel="Select status conservation"
            placeholder="Select status conservation"
            onValueChange={(value) => setStateConservation(value)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size="4" />,
            }}
            _dropdownIcon={{
              width: 0,
              height: 0,
              overflow: "hidden",
            }}
          >
            {statusConservation.map((c) => (
              <Select.Item key={c.code} label={c.name} value={c.code} />
            ))}
          </Select>
        </VStack>

        {err ? <Error message={message} /> : null}

        <View style={styles.buttonContainer}>
          <EasyButton
            primary
            large
            onPress={() => addSpecie()}
          >
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

export default SpecieForm;
