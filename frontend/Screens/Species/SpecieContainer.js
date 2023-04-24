import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

// import screens
import SpecieList from "./SpecieList";

// import data
const data = require("../../assets/data/species.json");

// screen height definition
var { height } = Dimensions.get("window");

const SpecieContainer = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    setSpecies(data);

    return () => {
      setSpecies([]);
    };
  }, []);

  return (
    <View>
      <Text>Species Container</Text>
      <View>
        <FlatList
          data={species}
          renderItem={({ item }) => <SpecieList key={item.id} item={item} />}
          keyExtractor={(item) => item.scientific_name}
          numColumns={2}
          key={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    height: height * 1.4,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
});

export default SpecieContainer;
