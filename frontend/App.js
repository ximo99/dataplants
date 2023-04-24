// import dependencies
import React from "react";
import { LogBox, StyleSheet, View } from "react-native";

// import screens
import SpecieContainer from "./Screens/Species/SpecieContainer";

LogBox.ignoreAllLogs(true);

function App() {
  return (
    <View style={styles.container}>
      <SpecieContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
