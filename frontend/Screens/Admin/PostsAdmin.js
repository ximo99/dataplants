import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Toast } from "native-base";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

const PostsAdmin = (props) => {
  const [postList, setPostList] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    axios.get(`${baseURL}posts`).then((res) => {
      setPostList(res.data);
    });

    return () => {
      setPostList();
    };
  }, []);

  const deletePost = (postId) => {
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((error) => console.log(error));

    axios
      .delete(`${baseURL}posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const filteredPosts = postList.filter((post) => post._id !== postId);
          setPostList(filteredPosts);
          Toast.show({
            title: "Deleted post.",
            description: "The post was deleted successfully.",
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
        {postList &&
          postList.map((post, index) => (
            <View key={post._id} style={styles.postContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {post.user
                    ? post.user.name + " (" + post.user.country + ")"
                    : "User not found"}
                </Text>
                <Text style={styles.text}>
                  {post.specie.scientific_name}, {post.location}
                </Text>
                <Text style={styles.text}>Created at: {post.dateCreated}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="trash-o"
                  size={24}
                  color="red"
                  onPress={() => deletePost(post._id)}
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
  postContainer: {
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

export default PostsAdmin;
