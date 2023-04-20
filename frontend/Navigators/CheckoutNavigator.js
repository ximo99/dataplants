import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import screens
import Checkout from "../Screens/Cart/Checkout/Checkout";
import Payment from "../Screens/Cart/Checkout/Payment";
import Confirm from "../Screens/Cart/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Shipping"
        component={Checkout}
        options={{ headerShown: false }}
      />
      
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Confirm"
        component={Confirm}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
