import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import screens
import PostsAdmin from '../Screens/Admin/PostsAdmin'
import SpeciesAdmin from '../Screens/Admin/SpeciesAdmin'
import UsersAdmin from '../Screens/Admin/UsersAdmin'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={PostsAdmin}
        options={{ headerShown: false }}
      />
      
      <Tab.Screen
        name="Species"
        component={SpeciesAdmin}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Users"
        component={UsersAdmin}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
