// import dependencies
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import { Avatar, VStack, HStack, Image, Text, ScrollView } from "native-base";

// import data
import colors from "../../assets/common/colors";

// screen width definition
var { width, height } = Dimensions.get("window");

const SearchedPosts = (props) => {
  const { postsFiltered } = props;

  return (
    <View>
      <ScrollView>
        <VStack style={styles.container}>
          {postsFiltered.length > 0 ? (
            postsFiltered.map((item) => (
              <TouchableOpacity
                key={item._id.$oid}
                onPress={() =>
                  props.navigation.navigate("Post Detail", { item: item })
                }
              >
                <HStack style={styles.items}>
                  <Avatar
                    source={{
                      uri: item.image
                        ? item.image
                        : "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png",
                    }}
                  />
                  <VStack style={styles.content}>
                    <Text style={styles.title}>{item.specie.scientific_name}</Text>
                    <Text style={styles.subtitle}>{item.specie.common_name}</Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.center}>
              <Text style={styles.noPosts}>
                No posts match selected criteria
              </Text>
            </View>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    padding: 10,
    backgroundColor: colors.background,
  },
  items: {
    alignItems: "center",
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  noPosts: {
    color: "white",
    alignSelf: "center",
    marginVertical: 20,
    fontSize: 20,
  },
  subtitle: {
    color: colors.grey,
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedPosts;
