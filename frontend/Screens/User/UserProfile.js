// import dependencies
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

// import context API
import AuthGlobal from "../../Context/store/AuthGlobal";
import UserContext from "../../Context/UserContext";

// import actions
import { logOutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState();

  useEffect(() => {
    // users
    axios.get(`${baseURL}users/${userContext.user?.userId}`).then((res) => {
      setUser(res.data);
    });
  
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.subtitle}>{user?.email}</Text>
        <View style={styles.info}>
          <Text style={styles.others}>Country: {user?.country}</Text>
          <Text style={styles.others}>Profession: {user?.profession}</Text>

          {user?.isAdmin ? (
            <View style={styles.adminContainer}>
              <Text style={styles.admin}>Admin user</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: user?.photoUser
              ? user.photoUser
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
          }}
        />
        <TouchableOpacity style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 40,
    paddingHorizontal: 40,
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.grey,
    fontSize: 20,
  },
  info: {
    marginVertical: 20,
  },
  others: {
    color: colors.grey,
    fontSize: 18,
  },
  adminContainer: {
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 10,
  },
  admin: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderStyle: "solid",
    borderWidth: 4,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#e0e0e0",
    backgroundColor: colors.background,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default UserProfile;
