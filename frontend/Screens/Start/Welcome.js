import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

import SpecieContainer from "../Species/SpecieContainer";
import Main from '../../Navigators/Main';

// import data
import colors from "../../assets/common/colors";

// import screens
import Login from './Login';

const Welcome = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Login')} activeOpacity={1}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Image
          source={require('../../assets/logotip.png')}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Click here!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  innerContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 325,
    height: 83,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'white'
  },
});

export default Welcome;
