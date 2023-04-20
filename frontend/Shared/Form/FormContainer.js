// import dependencies
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";

// screen width definition
var { width } = Dimensions.get("window");

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
    fontSize: 20,
    padding: 10,
    fontWeight: "bold"
  },
});

export default FormContainer;
