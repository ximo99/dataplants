// import dependencies
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// import data
import baseURL from "../../assets/common/baseUrl";

// import context API
import AuthGlobal from "../../Context/store/AuthGlobal";
import UserContext from "../../Context/UserContext";

// import actions
import { logOutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState();

  useEffect(() => {
    // species
    axios.get(`${baseURL}users/${userContext.user?.userId}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <View>
      <Text>user profile screen: {userContext.user?.userId}</Text>
      <Text>User name: {user?.name}</Text>
      <Text>User email: {user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default UserProfile;
