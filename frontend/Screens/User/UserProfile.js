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

// import actions
import { logOutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  /* const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useFocusEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.sub}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]); */

  return (
    /*   <View>
      <ScrollView>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>

          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Button
            title="Sign Out"
            onPress={
              (() => AsyncStorage.removeItem("jwt"),
              logOutUser(context.dispatch))
            }
          />
        </View>
      </ScrollView>
    </View> */

    <View>
      <Text>user profile screen</Text>
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
