// import dependencies
import React, { useContext } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import navigators
import SpecieNavigator from "./SpecieNavigator";
import PostNavigator from "./PostNavigator";
import AdminNavigator from "./AdminNavigator";
import UserNavigator from "./UserNavigator";

// import context API
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2ea082",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#515760",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostNavigator}
        options={{
          
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Species"
        component={SpecieNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon
                name="leaf"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            </View>
          ),
        }}
      />

      {/*       {
        context.stateUser.user.isAdmin == true ? ( */}
      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      {/*         ) : null
      } */}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
