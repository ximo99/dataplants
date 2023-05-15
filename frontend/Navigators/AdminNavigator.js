import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import PostsAdmin from "../Screens/Admin/PostsAdmin";
import UsersAdmin from "../Screens/Admin/UsersAdmin";
import SpeciesAdmin from "../Screens/Admin/SpeciesAdmin";
import UpdateSpecie from "../Screens/Admin/UpdateSpecie";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function SpeciesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Species Admin" component={SpeciesAdmin} />
      <Stack.Screen name="Update Specie" component={UpdateSpecie} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2ea082",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#515760",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#2ea082",
        },
      }}
    >
      <Tab.Screen
        name="Posts Admin"
        component={PostsAdmin}
      />

      <Tab.Screen
        name="Species Admin Navigator"
        component={SpeciesStack}
        options={{
          title: "Species Admin Navigator",
        }}
      />

      <Tab.Screen
        name="Users Admin"
        component={UsersAdmin}
      />
    </Tab.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyTabs />;
}
