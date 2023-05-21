import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Toast } from "native-base";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

const UsersAdmin = (props) => {
  const [userList, setUserList] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserList(res.data);
      });

    return () => {
      setUserList();
    };
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`${baseURL}users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const filteredUsers = userList.filter((user) => user._id !== userId);
          setUserList(filteredUsers);
          Toast.show({
            title: "Deleted user.",
            description: "The user was deleted successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        Toast.show({
          title: "Error",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {userList &&
          userList.map((user, index) => (
            <View key={user._id} style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {user.name + " (" + user.country + ")"}
                </Text>
                <Text style={styles.text}>{user.email}</Text>
                <Text style={styles.text}>{user.profession}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="trash-o"
                  size={24}
                  color="red"
                  onPress={() => deleteUser(user._id)}
                />
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "flex-end",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});

export default UsersAdmin;
