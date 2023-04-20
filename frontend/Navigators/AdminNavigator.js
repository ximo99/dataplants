// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import ProductForm from "../Screens/Admin/ProductForm";
import Categories from "../Screens/Admin/Categories";
import Products from "../Screens/Admin/Products";
import Orders from "../Screens/Admin/Order";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: "Categories",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          title: "Orders",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProductForm"
        component={ProductForm}
        options={{
          title: "ProductForm",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    
    
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
