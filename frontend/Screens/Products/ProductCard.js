import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Toast } from "native-base";
import { connect } from "react-redux";

// import actions
import * as actions from "../../Redux/Actions/cartActions";

// screen width definition
var { width } = Dimensions.get("window");

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg",
        }}
      />

      <View style={styles.card} />

      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>

      <Text style={styles.price}>${price} </Text>

      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(props);
              Toast.show({
                title: "Product added",
                description: `${name} added to Cart`,
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
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
    width: width / 2 - 20,
    height: width / 1.7,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
  },
  card: {
    marginBottom: 5,
    marginTop: 120,
    height: width / 2 - 20 - 240,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 5,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
