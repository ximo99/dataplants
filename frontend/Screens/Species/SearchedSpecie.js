// import dependencies
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import { Avatar, VStack, HStack, Image, Text, ScrollView } from "native-base";

// import data
import colors from "../../assets/common/colors";

// screen width definition
var { width, height } = Dimensions.get("window");

const SearchedSpecies = (props) => {
  const { speciesFiltered } = props;

  return (
    <View>
      <ScrollView>
        <VStack style={styles.container}>
          {speciesFiltered.length > 0 ? (
            speciesFiltered
              .slice()
              .reverse()
              .map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    props.navigation.navigate("Specie Detail", { item: item })
                  }
                >
                  <HStack style={styles.items}>
                    <Avatar
                      source={{
                        uri: item.image
                          ? "http://192.168.1.142:3000/public/uploads/"+item.image
                          : "https://cdn.pixabay.com/photo/2014/03/24/17/06/box-295029_1280.png",
                      }}
                    />
                    <VStack style={styles.content}>
                      <Text style={styles.title}>{item.scientific_name}</Text>
                      <Text style={styles.subtitle}>{item.common_name}</Text>
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              ))
          ) : (
            <View style={styles.center}>
              <Text style={styles.noSpecies}>
                No species match selected criteria
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
    fontStyle: "italic",
  },
  noSpecies: {
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

export default SearchedSpecies;
