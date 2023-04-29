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

const UsersAdmin = (props) => {

  return (

    <View>
      <Text>UsersAdmin screen</Text>
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

export default UsersAdmin;
