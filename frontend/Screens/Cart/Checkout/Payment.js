// import dependencies
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  Box,
  Center,
  Heading,
  Pressable,
  Select,
  Text,
  VStack,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";

// screen height definition
var { height } = Dimensions.get("window");

const methods = [
  {
    name: "Cash on Delivery",
    value: 1,
  },
  {
    name: "Bank Transfer",
    value: 2,
  },
  {
    name: "Card Payment",
    value: 3,
  },
];

const paymentCards = [
  {
    name: "Wallet",
    value: 1,
  },
  {
    name: "Visa",
    value: 2,
  },
  {
    name: "MasterCard",
    value: 3,
  },
  {
    name: "Other",
    value: 4,
  },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Box safeArea flex={1} p="2">
      <Center>
        <Heading style={{ fontSize: 20, fontWeight: "bold" }} mb={4}>
          Choose your payment method
        </Heading>
      </Center>

      <VStack>
        {methods.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => setSelected(item.value)}
              style={styles.methodStyle}
            >
              <Text>{item.name}</Text>
              {selected === item.value && (
                <Icon name="check-circle" size={24} color="primary.500" />
              )}
            </Pressable>
          );
        })}

        {selected == 3 ? (
          <VStack space={4} style={styles.paymentCartStyle}>
            <Select
              selectedValue={card}
              minWidth="83%"
              borderWidth={0}
              fontSize={14}
              accessibilityLabel="Select a card"
              placeholder="Select a card"
              onValueChange={(value) => setCard(value)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <Icon name="check" size={4}   />,
              }}
              _dropdownIcon={{
                width: 0,
                height: 0,
                overflow: "hidden",
              }}
            >
              {paymentCards.map((c, index) => {
                return (
                  <Select.Item key={c.name} label={c.name} value={c.value}/>
                );
              })}
            </Select>
          </VStack>
        ) : null}

        <Button
          title="Confirm"
          onPress={() => props.navigation.navigate("Confirm", { order })}
        />
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  methodStyle: {
    height: 60,
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "orange",
  },
  paymentCartStyle: {
    height: 60,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 12,
    borderRadius: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "white",
  },
});

export default Payment;
