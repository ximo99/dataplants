// import dependencies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import Welcome from "../Screens/Start/Welcome";
import Login from "../Screens/Start/Login";
import Register from "../Screens/Start/Register";

// import navigators
import Main from "../Navigators/Main";

const Stack = createStackNavigator();


const Init = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Init;
