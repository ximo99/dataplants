// import dependencies
import React from "react";
import { StyleSheet, TextInput } from "react-native";

// import data
import colors from "../../assets/common/colors";

const Input = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 60,
    backgroundColor: colors.grey,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    //borderWidth: 2,
    //borderColor: "white",
  },
});

export default Input;
