import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { compareHist, cv, cvImageToBase64 } from "react-native-opencv";

// import data
import colors from "../../assets/common/colors";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// screen width definition
var { width, height } = Dimensions.get("window");

const IdentifyContainer = () => {
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const identifySpecie = async (mainImage) => {
    setIsLoading(true);
  
    const mainHist = await calcHist(mainImage);
  
    try {
      const response = await axios.get(`${baseURL}species/histogram`);
      const speciesHistograms = response.data;
  
      let result = null;
      let maxSimilarity = 0;
  
      for (let i = 0; i < speciesHistograms.length; i++) {
        const speciesHist = speciesHistograms[i];
        const similarity = await compareHist(mainHist, speciesHist);
  
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          result = speciesNames[i];
        }
      }
  
      setIsLoading(false);
  
      if (result) {
        Alert.alert("Specie identified", "The species is: " + result);
      } else {
        Alert.alert("Specie not found", "Try another image with more detail.");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Failed to fetch species histograms.");
    }
  };
  

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add an image and identify the species</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>

      <EasyButton
        primary
        large
        onPress={(mainImage) => identifySpecie(mainImage)}
      >
        <Text style={styles.buttonText}>Identify</Text>
      </EasyButton>

      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#5cb85c" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
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
    margin: 20,
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
  title: {
    textAlign: "center",
    fontSize: 30,
    color: colors.grey,
    fontWeight: "bold",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default IdentifyContainer;
