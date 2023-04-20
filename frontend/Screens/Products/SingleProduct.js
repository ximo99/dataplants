// import dependencies
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Box, Button, HStack, ScrollView, Toast } from "native-base";
import { connect } from "react-redux";

// import actions
import * as actions from "../../Redux/Actions/cartActions";

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  return (
    <Box style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2014/03/24/17/06/box-295029_1280.png",
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{marginRight: 10}}>Availability: {availabilityText}</Text>
            {availability}
          </View>
          <Text>
            {item.richDescription}
          </Text>
        </View>
      </ScrollView>

      <HStack style={styles.bottomContainer}>
        <Text style={styles.price}>$ {item.price}</Text>
        <EasyButton
          primary
          medium
          onPress={() => {
            props.addItemToCart(item);
            Toast.show({
              title: "Product added",
              description: `${item.name} added to Cart`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </EasyButton>
      </HStack>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  price: {
    fontSize: 24,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
