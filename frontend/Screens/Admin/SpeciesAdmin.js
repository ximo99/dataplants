import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

const SpeciesAdmin = (props) => {
  const isFocused = useIsFocused();
  const [specieList, setSpecieList] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get token
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((error) => console.log(error));

    if (isFocused) {
      // Get species list
      axios.get(`${baseURL}species`).then((res) => {
        setSpecieList(res.data);
        setLoading(false);
      });

      return () => {
        setSpecieList();
      };
    }
  }, [isFocused]);

  const deleteSpecie = (specieId) => {
    axios
      .delete(`${baseURL}species/${specieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const filteredSpecies = specieList.filter(
            (specie) => specie._id !== specieId
          );
          setSpecieList(filteredSpecies);
          Toast.show({
            title: "Deleted specie.",
            description: "The specie was deleted successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
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
        console.log(error);
      });
  };

  const verifySpecie = (specieId) => {
    axios
      .put(
        `${baseURL}species/verify/${specieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const updatedSpecies = specieList.map((item) =>
            item._id === specieId ? res.data : item
          );
          setSpecieList(updatedSpecies);
          Toast.show({
            title: "Specie verification status updated",
            description:
              "The specie verification status was updated successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
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
        console.log(error);
      });
  };

  const updateSpecie = (specieId) => {
    props.navigation.navigate("Update Specie", { specieId: specieId });
  };

  return (
    <>
      {loading == false ? (
        <View style={styles.container}>
          <ScrollView>
            {specieList &&
              specieList.map((specie, index) => (
                <View key={specie._id} style={styles.specieContainer}>
                  <View style={styles.textContainer}>
                    <Text>
                      <Text style={[styles.text, { fontStyle: "italic" }]}>
                        {specie.scientific_name},
                      </Text>
                      <Text style={styles.text}> {specie.common_name}</Text>
                    </Text>

                    <Text style={styles.text}>
                      {specie.user
                        ? specie.user.name + " (" + specie.user.country + ")"
                        : "User not found"}
                    </Text>
                    <Text style={styles.text}>
                      Created at: {specie.dateCreated}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.icon}
                      name="pencil"
                      size={24}
                      color="#2ea082"
                      onPress={() => updateSpecie(specie._id)}
                    />
                    {specie.isVerified ? (
                      <Icon
                        style={styles.icon}
                        name="check"
                        size={24}
                        color="orange"
                        onPress={() => verifySpecie(specie._id)}
                      />
                    ) : (
                      <Icon
                        style={styles.icon}
                        name="exclamation-triangle"
                        size={24}
                        color="orange"
                        onPress={() => verifySpecie(specie._id)}
                      />
                    )}
                    <Icon
                      style={styles.icon}
                      name="trash-o"
                      size={24}
                      color="red"
                      onPress={() => deleteSpecie(specie._id)}
                    />
                  </View>
                </View>
              ))}
          </ScrollView>
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
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
  },
  specieContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  icon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 3,
  },
  text: {
    color: "white",
  },
});

export default SpeciesAdmin;
