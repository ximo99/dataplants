import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Avatar, VStack, HStack, Text, ScrollView } from "native-base";

// import data
import colors from "../../assets/common/colors";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";


// screen width definition
var { width } = Dimensions.get("window");

const PostCard = (props) => {
  const { specie, description, location, user, image } = props;
  //const [item, setItem] = useState(props.route.params.item);
  const [fullDescription, setFullDescription] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (specie.state_conservation === "GS") {
      setAvailability(<TrafficLight gs></TrafficLight>);
      setAvailabilityText("Not threatened");
    } else if (specie.state_conservation === "LC") {
      setAvailability(<TrafficLight lw></TrafficLight>);
      setAvailabilityText("Least Concern");
    } else if (specie.state_conservation === "NT") {
      setAvailability(<TrafficLight lw></TrafficLight>);
      setAvailabilityText("Near Threatened");
    } else if (specie.state_conservation === "VU") {
      setAvailability(<TrafficLight am></TrafficLight>);
      setAvailabilityText("Vulnerable");
    } else if (specie.state_conservation === "EN") {
      setAvailability(<TrafficLight cr_am></TrafficLight>);
      setAvailabilityText("Endangered");
    } else if (specie.state_conservation === "CR") {
      setAvailability(<TrafficLight cr_am></TrafficLight>);
      setAvailabilityText("Critically Endangered");
    } else if (specie.state_conservation === "EW") {
      setAvailability(<TrafficLight ex></TrafficLight>);
      setAvailabilityText("Extinct in the wild");
    } else if (specie.state_conservation === "EX") {
      setAvailability(<TrafficLight ex></TrafficLight>);
      setAvailabilityText("Extinct");
    } else {
      setAvailabilityText("No data");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  const handleTouchStart = () => {
    setFullDescription(true);
  };

  const handleTouchEnd = () => {
    setFullDescription(false);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: image
            ? "http://192.168.1.142:3000/public/uploads/"+image
            : "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png",
        }}pil
      />

      <View
        style={[
          styles.descriptionBackground,
          fullDescription ? styles.descriptionExpanded : {},
        ]}
      >
        {fullDescription ? (
          <Text style={styles.descrip}>{description}</Text>
        ) : (
          <HStack>
            <Avatar
              style={styles.userImage}
              resizeMode="cover"
              source={{
                uri: user.photoUser
                  ? user.photoUser
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
              }}
            />
            <View style={styles.leftContent}>
              <Text style={styles.title}>{user ? user.name : 'User not found'}</Text>
              <Text style={styles.subtitle}>{specie.scientific_name}</Text>
            </View>

            <View style={styles.rightContent}>
              <Text style={styles.info}>{location}</Text>
              <View style={{ flexDirection: "row", marginVertical: 1, bottom: 0 }}>
                <Text style={styles.info}>{availabilityText}</Text>
              </View>
            </View>
          </HStack>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: width / 1.45,
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
    height: 285,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 7,
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    fontStyle: "italic",
  },
  info: {
    textAlign: "right",
    color: "white",
    fontSize: 15,
    alignItems: "flex-end",
  },
  descriptionBackground: {
    backgroundColor: "rgba(46, 160, 130, 0.9)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 7,
  },
  descriptionExpanded: {
    top: 0,
    height: "100%",
  },
  descrip: {
    color: "white",
    fontSize: 15,
    textAlign: "justify",
    marginHorizontal: 7,
    marginVertical: 5,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
  },
});

export default PostCard;
