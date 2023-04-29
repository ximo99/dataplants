// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import UserProfile from "../Screens/User/UserProfile";

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
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
    return <MyStack />
};
