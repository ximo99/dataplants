// import dependencies
import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
    badge: {
      width: 25,
      height: 25,
      borderRadius: 15,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: -5,
      right: -15,
    },
    text: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',

    },
  });
  
  

export default connect(mapStateToProps, null)(CartIcon);
