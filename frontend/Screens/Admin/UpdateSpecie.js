import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import { Box, Select, VStack, Toast } from "native-base";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

// import of reusable components
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

const UpdateSpecie = ({ route, navigation }) => {
  const { specieId } = route.params;

  const [scientificName, setScientificName] = useState();
  const [commonName, setCommonName] = useState();
  const [description, setDescription] = useState();
  const [user, setUser] = useState();
  const [division, setDivision] = useState();
  const [family, setFamily] = useState();
  const [gender, setGender] = useState();
  const [stateConservation, setStateConservation] = useState();
  const [category, setCategory] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}species/${specieId}`)
      .then((res) => {
        const specie = res.data;
        setScientificName(specie.scientific_name || "");
        setCommonName(specie.common_name || "");
        setDescription(specie.description || "");
        setUser(specie.user || "");
        setDivision(specie.division || "");
        setFamily(specie.family || "");
        setGender(specie.gender || "");
        setStateConservation(specie.state_conservation || "");
        setCategory(specie.category || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching specie data: ", error);
      });

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching categories data: ", error);
      });
  }, []);

  const updateSpecie = async () => {
    try {
      const response = await axios.put(`${baseURL}species/${specieId}`, {
        scientific_name: scientificName,
        common_name: commonName,
        description,
        user,
        division,
        family,
        gender,
        state_conservation: stateConservation,
        category,
      });

      if (response.status === 200) {
        Toast.show({
          text: "Specie updated.",
          description: "The specie is updated to the DB.",
          status: "success",
          duration: 2000,
          isClosable: true,
          type: "success",
        });

        setTimeout(() => {
          navigation.navigate("SpecieList");
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
          <FormContainer title="Edit Specie">
            <View style={styles.label}>
              <Text style={styles.text}>Scientific Name:</Text>
            </View>
            <Input
              name="scientific_name"
              id="scientific_name"
              value={scientificName}
              onChangeText={(text) => setScientificName(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Common Name:</Text>
            </View>
            <Input
              name="common_name"
              id="common_name"
              value={commonName}
              onChangeText={(text) => setCommonName(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Description:</Text>
            </View>
            <Input
              name="description"
              id="description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Division:</Text>
            </View>
            <Input
              name="division"
              id="division"
              value={division}
              onChangeText={(text) => setDivision(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Family:</Text>
            </View>
            <Input
              name="family"
              id="family"
              value={family}
              onChangeText={(text) => setFamily(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Gender:</Text>
            </View>
            <Input
              name="gender"
              id="gender"
              value={gender}
              onChangeText={(text) => setGender(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>State Conservation:</Text>
            </View>
            <Input
              name="state_conservation"
              id="state_conservation"
              value={stateConservation}
              onChangeText={(text) => setStateConservation(text)}
            />

            <View style={styles.label}>
              <Text style={styles.text}>Category:</Text>
            </View>
            <VStack alignItems="center" space={4}>
              <Select
                mode="dropdown"
                iosIcon={<Icon name="chevron-down-outline" />}
                style={{ width: undefined, color: "black" }}
                minWidth="83%"
                borderWidth={0}
                fontSize={14}
                name="category"
                id="category"
                value={category}
                placeholder={category ? category.name : "Select a category"}
                placeholderTextColor={"#000"}
                selectedValue={pickerValue}
                onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
              >
                {categories.map((c) => {
                  return (
                    <Select.Item key={c._id} label={c.name} value={c._id} />
                  );
                })}
              </Select>
            </VStack>

            <View style={styles.buttonContainer}>
              <EasyButton primary large onPress={() => updateSpecie()}>
                <Text style={styles.buttonText}>Confirm</Text>
              </EasyButton>
            </View>
          </FormContainer>
        </View>
      ) : (
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
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    marginBottom: 20,
    width: "80%",
  },
  icon: {
    flex: 1,
  },
});

export default UpdateSpecie;
