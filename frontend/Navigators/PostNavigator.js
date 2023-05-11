// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import PostContainer from "../Screens/Posts/PostContainer";
import PostForm from "../Screens/Posts/PostForm";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post Container"
        component={PostContainer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PostForm"
        component={PostForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function PostNavigator() {
  return <MyStack />;
}
