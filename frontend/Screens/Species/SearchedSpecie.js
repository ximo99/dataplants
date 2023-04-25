// import dependencies
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import { Avatar, VStack, HStack, Image, Text } from "native-base";

// screen width definition
var { width } = Dimensions.get("window");

const SearchedSpecies = (props) => {
  const { speciesFiltered } = props;

  return (
    <VStack style={{width: width}}>
      {speciesFiltered.length > 0 ? (
        speciesFiltered.map((item) => (
          <TouchableOpacity
            key={item._id.$oid}
            //onPress={}
          >
            <HStack alignItems="center" space={4} py={2}>
              <Avatar
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png",
                }}
              />
              <VStack>
                <Text>{item.scientific_name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.common_name}
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No species match selected criteria
          </Text>
        </View>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  

export default SearchedSpecies;
