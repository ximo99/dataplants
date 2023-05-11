// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import UserProfile from "../Screens/User/UserProfile";
import UserForm from "../Screens/User/UserForm";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          title: "User Profile",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UserForm"
        component={UserForm}
        options={{
          title: "User Form",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
