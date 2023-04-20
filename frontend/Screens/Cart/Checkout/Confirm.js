// import dependencies
import React from "react";
import { Button, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Box, HStack, Text, VStack } from "native-base";
import { connect } from "react-redux";

// import actions
import * as actions from "../../../Redux/Actions/cartActions";
//import { clearCart } from "../../../Redux/Actions/cartActions";

// screen width and height definition
var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };

  const confirm = props.route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Box style={styles.titleContainer}>
        <Text fontSize={20} fontWeight="bold">
          Confirm order
        </Text>
      </Box>

      {props.route.params ? (
        <Box
          style={{
            borderWidth: 1,
            borderColor: "orange",
          }}
        >
          <Text style={styles.title}>Shipping to:</Text>

          <VStack space={1} p={2} paddingHorizontal={10}>
            <Text style={styles.shippingItem}>
              Address: {confirm.order.order.shippingAddress1}
            </Text>
            <Text style={styles.shippingItem}>
              Address 2: {confirm.order.order.shippingAddress2}
            </Text>
            <Text style={styles.shippingItem}>
              City: {confirm.order.order.city}
            </Text>
            <Text style={styles.shippingItem}>
              Zip code: {confirm.order.order.zip}
            </Text>
            <Text style={styles.shippingItem}>
              Country: {confirm.order.order.country}
            </Text>
          </VStack>

          <Text style={styles.title}>Items:</Text>
          {confirm.order.order.orderItems.map((x) => {
            return (
              <HStack style={styles.listItem}>
                <Avatar
                  source={{
                    uri: x.product.image,
                  }}
                  size="sm"
                />
                <Text style={{ paddingHorizontal: 10 }}>{x.product.name}</Text>
                <HStack justifyContent="flex-end" flex={1}>
                  <Text>$ {x.product.price}</Text>
                </HStack>
              </HStack>
            );
          })}
        </Box>
      ) : null}

      <View style={{ alignItems: "center", margin: 20 }}>
        <Button title={"Place order"} onPress={confirmOrder} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    paddingHorizontal: 20,
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  shippingItem: {
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: "white",
    paddingHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: width / 1.2,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);