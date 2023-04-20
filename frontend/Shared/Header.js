// import dependencies
import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";

// screen width definition
var { width } = Dimensions.get("window");

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/Logo.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default Header;
