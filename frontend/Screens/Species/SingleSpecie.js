import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Box, Button, HStack, ScrollView, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

// import data
import colors from "../../assets/common/colors";
import baseURL from "../../assets/common/baseUrl";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

// screen width definition
var { width, height } = Dimensions.get("window");

const SingleSpecie = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [specieId, setSpecieId] = useState(null); // New state variable for specieId

  const handleAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const formData = new FormData();
      const files = result.assets.map((uri) => ({ uri }));
  
      files.forEach((file) => {
        formData.append("images", file);
      });
  
      try {
        const response = await axios.put(
          `${baseURL}/gallery-images/${specieId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (props.route.params.item.state_conservation === "GS") {
      setAvailability(<TrafficLight gs></TrafficLight>);
      setAvailabilityText("Not threatened");
    } else if (props.route.params.item.state_conservation === "LC") {
      setAvailability(<TrafficLight lw></TrafficLight>);
      setAvailabilityText("Least Concern");
    } else if (props.route.params.item.state_conservation === "NT") {
      setAvailability(<TrafficLight lw></TrafficLight>);
      setAvailabilityText("Near Threatened");
    } else if (props.route.params.item.state_conservation === "VU") {
      setAvailability(<TrafficLight am></TrafficLight>);
      setAvailabilityText("Vulnerable");
    } else if (props.route.params.item.state_conservation === "EN") {
      setAvailability(<TrafficLight cr_am></TrafficLight>);
      setAvailabilityText("Endangered");
    } else if (props.route.params.item.state_conservation === "CR") {
      setAvailability(<TrafficLight cr_am></TrafficLight>);
      setAvailabilityText("Critically Endangered");
    } else if (props.route.params.item.state_conservation === "EW") {
      setAvailability(<TrafficLight ex></TrafficLight>);
      setAvailabilityText("Extinct in the wild");
    } else if (props.route.params.item.state_conservation === "EX") {
      setAvailability(<TrafficLight ex></TrafficLight>);
      setAvailabilityText("Extinct");
    } else {
      setAvailabilityText("No data");
    }

    setSpecieId(item.specieId); // Asignar el valor de item.specieId a specieId

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  return (
    <Box style={styles.container}>
      <ScrollView>
        <View style={styles.info}>
          {item.isVerified ? null : (
            <View style={styles.verifyIcon}>
              <Icon name="exclamation-triangle" color={"yellow"} size={30} />
              <Text style={styles.verifyText}>
                This information isn't verified
              </Text>
            </View>
          )}
          <Text style={styles.title}>{item.scientific_name}</Text>
          <Text style={styles.subtitle}>{item.common_name}</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text style={styles.conservation}>{availabilityText}</Text>
            {availability}
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.others}>Division: {item.division}</Text>
          <Text style={styles.others}>Family: {item.family}</Text>
          <Text style={styles.others}>Gender: {item.gender}</Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? "http://192.168.1.142:3000/public/uploads/" + item.image
                : "https://cdn.pixabay.com/photo/2014/03/24/17/06/box-295029_1280.png",
            }}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.others}>Description:</Text>
          <Text style={[styles.others, { textAlign: "justify" }]}>
            {item.description}
          </Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          {item.images && item.images.length > 0 && (
            <Swiper style={styles.swiper} showsButtons loop>
              {item.images.map((image, index) => (
                <View key={index}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: image
                        ? "http://192.168.1.142:3000/public/uploads/" + image
                        : "https://cdn.pixabay.com/photo/2014/03/24/17/06/box-295029_1280.png",
                    }}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <EasyButton onPress={handleAddImage} secondary large>
            <Text style={{ color: "white" }}>Add More Images</Text>
          </EasyButton>
        </View>

      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
  verifyIcon: {
    flexDirection: "column",
    alignItems: "flex-end",
    right: 0,
    position: "absolute",
  },
  verifyText: {
    fontSize: 15,
    color: colors.grey,
    textAlign: "right",
    width: 125,
    marginTop: 5,
  },
  image: {
    height: 300,
    width: "100%",
    position: "relative",
    marginBottom: 20,
    borderRadius: 10,
  },
  info: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  subtitle: {
    color: colors.grey,
    fontSize: 20,
  },
  others: {
    color: colors.grey,
    fontSize: 18,
  },
  conservation: {
    color: colors.grey,
    fontSize: 15,
    marginRight: 10,
  },
  swiper: {
    height: 200,
  },
  buttonContainer: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default SingleSpecie;
