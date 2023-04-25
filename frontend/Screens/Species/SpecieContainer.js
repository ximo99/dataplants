import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Box, HStack, Input, ScrollView, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

// import screens
import SpecieList from "./SpecieList";
import SearchedSpecies from "./SearchedSpecie";

// import data
const data = require("../../assets/data/species.json");

// screen height definition
var { height } = Dimensions.get("window");

const SpecieContainer = () => {
  const [species, setSpecies] = useState([]);
  const [speciesFiltered, setSpeciesFiltered] = useState([]);
  const [focus, setFocus] = useState([]);

  useEffect(() => {
    setSpecies(data);
    setSpeciesFiltered(data);
    setFocus(false);

    return () => {
      setSpecies([]);
      setSpeciesFiltered([]);
      setFocus([]);
    };
  }, []);

  const searchSpecies = (text) => {
    setSpeciesFiltered(
      species.filter(
        (i) =>
          i.scientific_name.toLowerCase().includes(text.toLowerCase()) ||
          i.common_name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // font definition
  const [fontsLoaded] = useFonts({
    DelaGothicOne: require("../../assets/fonts/Dela_Gothic_One/DelaGothicOne-Regular.ttf"),
    Lato: require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    Arsenal: require("../../assets/fonts/Arsenal/Arsenal-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <HStack style={styles.searchBar}>
        <Box flex={1} style={styles.boxSearch}>
          <Input
            placeholder="Search"
            style={styles.inputSearch}
            placeholderTextColor="#646464"
            onFocus={openList}
            onChangeText={(text) => {
              searchSpecies(text);
            }}
            InputLeftElement={
              <FontAwesome
                name="search"
                size={20}
                color="#646464"
                paddingLeft={15}
              />
            }
            InputRightElement={
              focus && (
                <FontAwesome
                  onPress={onBlur}
                  name="times"
                  size={20}
                  color="#646464"
                  paddingRight={10}
                />
              )
            }
          />
        </Box>
      </HStack>

      {focus == true ? (
        <View>
          <SearchedSpecies speciesFiltered={speciesFiltered} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Species Container</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={species}
              renderItem={({ item }) => (
                <SpecieList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.scientific_name}
              numColumns={2}
              key={2}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#515760",
  },
  listContainer: {
    flex: 1,
    height: height * 1.4,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  text: {
    fontFamily: "Arsenal",
    fontWeight: "bold",
  },
});

export default SpecieContainer;
