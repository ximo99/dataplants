import React, { useCallback, useEffect, useState, useRef } from "react";
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
import SpecieList from "./SpecieList";
import SearchedSpecies from "./SearchedSpecie";
import CategoryFilter from "./CategoryFilter";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

// screen height definition
var { height } = Dimensions.get("window");

const SpecieContainer = (props) => {
  const [species, setSpecies] = useState([]);
  const [speciesFiltered, setSpeciesFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [speciesCtg, setSpeciesCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const searchInputRef = useRef();

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // species
      axios.get(`${baseURL}species`).then((res) => {
        setSpecies(res.data);
        setSpeciesFiltered(res.data);
        setSpeciesCtg(res.data);
        setInitialState(res.data);
        setLoading(false);
      });

      // categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("API call error");
        });

      return () => {
        setSpecies([]);
        setSpeciesFiltered([]);
        setFocus([]);
        setCategories([]);
        setActive([]);
        setInitialState();
      };
    }, [])
  );

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
    setSearchValue("");
    setSpeciesFiltered(species);
    setFocus(false);
  };

  const clearSearch = () => {
    setSearchText("");
    searchSpecies("");
    setFocus(false);
    searchInputRef.current.blur();
  };

  // categories methods
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setSpeciesCtg(initialState), setActive(true)]
        : [
            setSpeciesCtg(species.filter((i) => i.category._id === ctg)),
            setActive(true),
          ];
    }
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
                  searchSpecies(text);
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

          {focus == true ? (
            <View>
              <SearchedSpecies
                navigation={props.navigation}
                speciesFiltered={speciesFiltered}
              />
            </View>
          ) : (
            <ScrollView>
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  speciesCtg={speciesCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>

              {speciesCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {speciesCtg
                    .slice()
                    .reverse()
                    .map((item) => {
                      return (
                        <SpecieList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                </View>
              ) : (
                <View>
                  <Text style={[{ alignSelf: "center" }, styles.text]}>
                    No species found
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
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
  },
  moreIcon: {
    paddingLeft: 20,
  },
  listContainer: {
    flex: 1,
    height: height * 1.4,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 50,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default SpecieContainer;
