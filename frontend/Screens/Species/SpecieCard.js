import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Text } from "native-base";

// import data
import colors from "../../assets/common/colors";

// screen width definition
var { width } = Dimensions.get("window");

const SpecieCard = (props) => {
  const {
    scientific_name,
    common_name,
    description,
    category,
    user,
    division,
    family,
    gender,
    state_conservation,
    image,
    isVerified,
  } = props;

  return (
    <View style={[styles.container]}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: image
            ? "http://192.168.1.144:3000/public/uploads/"+image
            : "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png",
        }}
      />

      <View style={styles.card} />
      <Text style={styles.title}>
        {common_name.length > 15
          ? common_name.substring(0, 20 - 3) + "..."
          : common_name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 2,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
    backgroundColor: colors.primary,
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  card: {
    marginBottom: 5,
    marginTop: 160,
    height: width / 2 - 20 - 240,
    backgroundColor: "transparent",
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 13,
    fontWeight: "bold",
  },
});

export default SpecieCard;
