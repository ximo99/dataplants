// import dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { CheckIcon, Select, VStack } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

// import of reusable components
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";

// import data
const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />

        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />

        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        <VStack alignItems="center" space={4} style={styles.inputCountries}>
          <Select
            selectedValue={country}
            minWidth="83%"
            borderWidth={0}
            fontSize={14}
            accessibilityLabel="Select Country"
            placeholder="Select Country"
            onValueChange={(value) => setCountry(value)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size="4" />,
            }}
            _dropdownIcon={{
              width: 0,
              height: 0,
              overflow: "hidden",
            }}
          >
            {countries.map((c) => (
              <Select.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Select>
        </VStack>
        <Button onPress={() => checkOut()} title="Confirm" />
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  inputCountries: {
    height: 60,
    marginBottom: 20,
    marginHorizontal: 12,
    borderRadius: 20,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "white",
  },
});

export default connect(mapStateToProps)(Checkout);
