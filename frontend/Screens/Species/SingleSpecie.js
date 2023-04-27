import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Box, Button, HStack, ScrollView, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

// import data
import colors from "../../assets/common/colors";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

// screen width definition
var { width, height } = Dimensions.get("window");

const SingleSpecie = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.state_conservation === "GS") {
      setAvailability(<TrafficLight gs></TrafficLight>);
      setAvailabilityText("Not threatened");
    } else if (props.route.params.item.state_conservation === "LC") {
      setAvailability(<TrafficLight lc></TrafficLight>);
      setAvailabilityText("Least Concern");
    } else if (props.route.params.item.state_conservation === "NT") {
      setAvailability(<TrafficLight nt></TrafficLight>);
      setAvailabilityText("Near Threatened");
    } else if (props.route.params.item.state_conservation === "VU") {
      setAvailability(<TrafficLight vu></TrafficLight>);
      setAvailabilityText("Vulnerable");
    } else if (props.route.params.item.state_conservation === "EN") {
      setAvailability(<TrafficLight en></TrafficLight>);
      setAvailabilityText("Endangered");
    } else if (props.route.params.item.state_conservation === "CR") {
      setAvailability(<TrafficLight cr></TrafficLight>);
      setAvailabilityText("Critically Endangered");
    } else if (props.route.params.item.state_conservation === "EW") {
      setAvailability(<TrafficLight ew></TrafficLight>);
      setAvailabilityText("Extinct in the wild");
    } else if (props.route.params.item.state_conservation === "EX") {
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

  return (
    <Box style={styles.container}>
      <ScrollView>
        <View style={styles.info}>
          {item.isVerified === "true" ? null : (
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
                ? item.image
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
});

export default SingleSpecie;
