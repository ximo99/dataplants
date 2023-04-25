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
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

// import data
const data = require("../../assets/data/species.json");
const speciesCategories = require("../../assets/data/categories.json");

// screen height definition
var { height } = Dimensions.get("window");

const SpecieContainer = () => {
  const [species, setSpecies] = useState([]);
  const [speciesFiltered, setSpeciesFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [speciesCtg, setSpeciesCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSpecies(data);
    setSpeciesFiltered(data);
    setFocus(false);
    setCategories(speciesCategories);
    setSpeciesCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setSpecies([]);
      setSpeciesFiltered([]);
      setFocus([]);
      setCategories([]);
      setActive([]);
      setInitialState();
    };
  }, []);

  // species methods
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

  // categories methods
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setSpeciesCtg(initialState), setActive(true)]
        : [
            setSpeciesCtg(species.filter((i) => i.category.$oid === ctg)),
            setActive(true),
          ];
    }
  };

  // font definition
  const [fontsLoaded] = useFonts({
    DelaGothicOne: require("../../assets/fonts/Dela_Gothic_One/DelaGothicOne-Regular.ttf"),
    Lato: require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    Arsenal: require("../../assets/fonts/Arsenal/Arsenal-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#515760" }}>
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
        <ScrollView>
          <View>
            <CategoryFilter
              //paddingHorizontal={20}
              //marginHorizontal={20}
              categories={categories}
              categoryFilter={changeCtg}
              speciesCtg={speciesCtg}
              active={active}
              setActive={setActive}
            />
          </View>

          {speciesCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {speciesCtg.map((item) => {
                return (
                  <SpecieList
                    //navigation={props.navigation}
                    key={item._id.$oid}
                    item={item}
                  />
                );
              })}
            </View>
          ) : (
            <View>
              <Text
                style={[
                  { alignSelf: "center" },
                  styles.text,
                ]}
              >
                No species found
              </Text>
            </View>
          )}
          <View style={styles.container}></View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  boxSearch: {
    backgroundColor: "#c8c8c8",
    borderColor: "#c8c8c8",
    borderRadius: 5,
  },
  inputSearch: {
    fontSize: 18,
    fontFamily: "Lato",
    width: "100%",
  },
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
  },
  text: {
    color: "white",
    fontFamily: "Lato",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default SpecieContainer;
