// import dependencies
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import { Avatar, VStack, HStack, Image, Text } from "native-base";

// screen width definition
var { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
  const { productsFiltered } = props;

  return (
    <VStack style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() =>
              props.navigation.navigate("Product Detail", { item: item })
            }
          >
            <HStack alignItems="center" space={4} py={2}>
              <Avatar
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg",
                }}
              />
              <VStack>
                <Text>{item.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.description}
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match selected criteria
          </Text>
        </View>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProducts;
