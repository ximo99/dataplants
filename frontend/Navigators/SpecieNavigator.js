// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import SpecieContainer from "../Screens/Species/SpecieContainer";
import SingleSpecie from "../Screens/Species/SingleSpecie";
import SpecieForm from "../Screens/Species/SpecieForm";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Specie Container"
        component={SpecieContainer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Specie Detail"
        component={SingleSpecie}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SpecieForm"
        component={SpecieForm}
        options={{
          title: "SpecieForm",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function SpecieNavigator() {
  return <MyStack />;
}
