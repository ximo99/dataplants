// import dependencies
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";

// screen width definition
var { width } = Dimensions.get("window");


// import data
import colors from "../../assets/common/colors";

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 30,
    //marginBottom: 400,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
    color: colors.grey
  },
});

export default FormContainer;
