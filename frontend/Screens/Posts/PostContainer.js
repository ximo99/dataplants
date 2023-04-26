import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Box, HStack, Input, ScrollView, Text } from "native-base";

// import screens
import PostList from "./PostList";

// import data
import data from "../../assets/data/posts.json";
import colors from "../../assets/common/colors";

// screen height definition
var { height } = Dimensions.get("window");

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [postsFiltered, setPostsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);

  useEffect(() => {
    const sortedData = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

    const lastThreePosts = sortedData.slice(0, 20);

    setPosts(lastThreePosts);
    setPostsFiltered(lastThreePosts);
    setFocus(false);

    return () => {
      setPosts([]);
      setPostsFiltered([]);
      setFocus([]);
    };
  }, []);

  // posts methods
  const searchPosts = (text) => {
    setPostsFiltered(
      posts.filter((i) =>
        i.specie.scientific_name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View style={styles.container}>
      <HStack style={styles.searchBar}>
        <Box flex={1} style={styles.boxSearch}>
          <Input
            placeholder="Search"
            style={styles.inputSearch}
            placeholderTextColor={colors.search}
            onFocus={openList}
            onChangeText={(text) => {
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
                  onPress={onBlur}
                  name="times"
                  size={20}
                  color={colors.search}
                  paddingRight={10}
                />
              )
            }
          />
        </Box>
      </HStack>

      <ScrollView>
        <FlatList
        style={styles.listContainer}
          data={postsFiltered}
          renderItem={({ item }) => (
            <PostList key={item._id.$oid} item={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
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
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default PostContainer;
