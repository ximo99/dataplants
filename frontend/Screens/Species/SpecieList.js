import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

// import screens
import SpecieCard from "./SpecieCard";

// screen width definition
var { width } = Dimensions.get("window");

const SpecieList = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity style={{ width: "50%" }}>
      <View style={{ width: width / 2, backgroundColor: "#515760" }}>
        <SpecieCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default SpecieList;
