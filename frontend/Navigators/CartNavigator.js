// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import Cart from "../Screens/Cart/Cart";

// import navigatiors
import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart Container"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function CartNavigator() {
  return <MyStack />
};