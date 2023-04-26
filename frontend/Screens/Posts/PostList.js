import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

// import screens
import PostCard from "./PostCard";

// screen width definition
var { width } = Dimensions.get("window");

const PostList = (props) => {
  const { item } = props;

  return (
    <View style={{ width: width / 2, backgroundColor: "#515760" }}>
      <PostCard {...item} />
    </View>
  );
};

export default PostList;
