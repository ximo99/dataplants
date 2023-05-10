import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Box, HStack, Input, ScrollView, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

// import screens
import PostList from "./PostList";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

// screen height definition
var { height } = Dimensions.get("window");

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [postsFiltered, setPostsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const searchInputRef = useRef();

  useFocusEffect(
    useCallback(() => {
      setFocus(false);

      // posts
      axios.get(`${baseURL}posts`).then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        const lastPosts = sortedData.slice(0, 20);

        setPosts(lastPosts);
        setPostsFiltered(lastPosts);
        setLoading(false);
      });

      return () => {
        setPosts([]);
        setPostsFiltered([]);
        setFocus([]);
      };
    }, [])
  );

  // posts methods
  const searchPosts = (text) => {
    setPostsFiltered(
      posts.filter(
        (i) =>
          i.specie.scientific_name.toLowerCase().includes(text.toLowerCase()) ||
          i.specie.common_name.toLowerCase().includes(text.toLowerCase()) ||
          i.user.name.toLowerCase().includes(text.toLowerCase()) ||
          i.location.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setSearchValue("");
    setPostsFiltered(posts);
    setFocus(false);
  };

  const clearSearch = () => {
    setSearchText("");
    searchPosts("");
    setFocus(false);
    searchInputRef.current.blur();
  };

  return (
    <>
      {loading == false ? (
        <View style={styles.container}>
          <HStack style={styles.searchBar}>
            <Box flex={1} style={styles.boxSearch}>
              <Input
                ref={searchInputRef}
                placeholder="Search"
                style={styles.inputSearch}
                placeholderTextColor={colors.search}
                onFocus={openList}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  searchPosts(text);
                }}
                InputLeftElement={
                  <FontAwesome
                    name="search"
                    size={20}
                    color={colors.search}
                    paddingLeft={15}
                  />
                }
                InputRightElement={
                  focus && (
                    <FontAwesome
                      onPress={clearSearch}
                      name="times"
                      size={20}
                      color={colors.search}
                      paddingRight={10}
                    />
                  )
                }
              />
            </Box>
            <FontAwesome
              onPress={() => props.navigation.navigate("SpecieForm") }
              style={styles.moreIcon}
              name="plus-circle"
              size={45}
              color={colors.grey}
              paddingRight={10}
            />
          </HStack>

          <FlatList
            data={postsFiltered}
            renderItem={({ item }) => (
              <PostList key={item._id.$oid} item={item} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      ) : (
        //Loading
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          bgColor="#515760"
        >
          <ActivityIndicator
            size="large"
            backgroundColor="#515760"
            color="#5cb85c"
          />
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  boxSearch: {
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  inputSearch: {
    fontSize: 18,
    width: "100%",
  }  ,
  moreIcon: {
    paddingLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default PostContainer;
