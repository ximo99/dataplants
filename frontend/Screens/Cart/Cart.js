import React from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Box, Button, HStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";

// import screens
import CartItem from "./CartItem";

// import actions
import * as actions from "../../Redux/Actions/cartActions";

// screen width and height definition
var { height, width } = Dimensions.get("window");

// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const Cart = (props) => {
  var total = 0;

  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <>
      {props.cartItems.length ? (
        <Box style={styles.container}>
          <View>
            <Text style={styles.title}>Cart</Text>
            <SwipeListView
              data={props.cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    onPress={() => props.removeFromCart(data.item)}
                    style={styles.hiddenButton}
                  >
                    <Icon name="trash" color="white" size={30} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
          </View>

          <HStack style={styles.bottomContainer} space={4}>
            <Box>
              <Text style={styles.totalPrice}>$ {total}</Text>
            </Box>

            <Box>
              <EasyButton danger medium onPress={() => props.clearCart()}>
                <Text style={{ color: "white" }}>Clear</Text>
              </EasyButton>
            </Box>

            <Box>
              <EasyButton primary medium onPress={() => props.navigation.navigate("Checkout")}>
                <Text style={{ color: "white" }}>Checkout</Text>
              </EasyButton>
            </Box>
          </HStack>
        </Box>
      ) : (
        <Box style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  totalPrice: {
    fontSize: 18,
    color: "red",
  },
  hiddenContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "red",
  },
  hiddenButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    width: 75,
    height: "100%",
    backgroundColor: "red",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
