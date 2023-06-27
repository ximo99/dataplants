// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import IdentifyContainer from "../Screens/Identify/IdentifyContainer";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Identify Container"
        component={IdentifyContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function SpecieNavigator() {
  return <MyStack />;
}
