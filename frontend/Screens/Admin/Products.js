// import dependencies
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Text,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import { Box, HStack, Input } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'

// import screens
import ListItem from "./ListItem";

// import data
import baseURL from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// screen width and height definition
var { width, height } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>

      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Brand</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Name</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Category</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((error) => console.log(error));

    axios.get(`${baseURL}products`).then((res) => {
      setProductList(res.data);
      setProductFilter(res.data);
      setLoading(false);
    });

    return () => {
      setProductList();
      setProductFilter();
      setLoading(true);
    };
  }, []);

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }

    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item._id != id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container} >
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Orders")}
        >
           <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("ProductForm")}
        >
           <Icon name="plus" size={18} color="white" />
          <Text  style={styles.buttonText}>Products</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
           <Icon name="plus" size={18} color="white" />
          <Text  style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>

      <View>
        <HStack style={styles.searchBar}>
          <Box flex={1} style={styles.boxSearch}>
            <Input
              style={styles.inputSearch}
              placeholder="Search"
              onChangeText={(text) => searchProduct(text)}
              placeholderTextColor="#646464"
              InputLeftElement={
                <FontAwesome
                  name="search"
                  size={20}
                  color="#646464"
                  paddingLeft={15}
                />
              }
            />
          </Box>
        </HStack>
      </View>
      <View>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={ListHeader}
            data={productFilter}
            renderItem={({ item, index }) => {
              
              return (
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                   delete={deleteProduct}
                />
              );
            }}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#ededed",
    borderColor: "#ededed",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  boxSearch: {
    backgroundColor: "#c8c8c8",
    borderColor: "#c8c8c8",
    borderRadius: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 0,
  },
  inputSearch: {
    fontSize: 18,
    width: "100%",
  },
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    marginVertical: 3,
    width: width / 5,
  },
  headerText: {
    fontWeight: "600",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    marginLeft: 6,
    color: 'white'
  }
});

export default Products;
