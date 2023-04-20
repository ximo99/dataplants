// import dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, HStack, Text, VStack } from "native-base";

const CartItem = (props) => {
  const data = props.item;
  const [quantity, setQuantity] = useState(props.item.quantity);

  if (!data.product) {
    return null;
  }

  return (
    <HStack key={Math.random()} style={styles.listItem} space={4}>
      <Avatar
        style={styles.thumbnail}
        source={{
          uri: data.product.image
            ? data.product.image
            : "https://cdn.pixabay.com/photo/2014/03/24/17/06/box-295029_1280.png",
        }}
      />
      <VStack style={styles.body}>
        <Text style={styles.productName}>{data.product.name}</Text>
      </VStack>
      <Text style={styles.productPrice}>$ {data.product.price}</Text>
    </HStack>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  thumbnail: {
    width: 60,
    height: 60,
  },
  body: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default CartItem;
