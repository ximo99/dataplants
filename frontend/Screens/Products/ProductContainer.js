// import dependencies
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Box, HStack, Input, ScrollView, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

// import screens
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import CategoryFilter from "./CategoryFilter";

// import data
import baseURL from "../../assets/common/baseUrl";

// import of reusable components
import Banner from "../../Shared/Banner";

// screen height definition
var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // products
      axios.get(`${baseURL}products`).then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
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
        setProducts([]);
        setProductsFiltered([]);
        setFocus([]);
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  // products methods
  const SearchedProduct = (text) =>
    setProductsFiltered(
      products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(products.filter((i) => i.category._id === ctg)),
            setActive(true),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <View style={{ flex: 1 }}>
          <HStack style={styles.searchBar}>
            <Box flex={1} style={styles.boxSearch}>
              <Input
                placeholder="Search"
                style={styles.inputSearch}
                placeholderTextColor="#646464"
                onFocus={openList}
                onChangeText={(text) => {
                  SearchedProduct(text);
                }}
                InputLeftElement={
                  <FontAwesome
                    name="search"
                    size={20}
                    color="#646464"
                    paddingLeft={15}
                  />
                }
                InputRightElement={
                  focus && (
                    <FontAwesome
                      onPress={onBlur}
                      name="times"
                      size={20}
                      color="#646464"
                      paddingRight={10}
                    />
                  )
                }
              />
            </Box>
          </HStack>

          {focus == true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>

                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>

                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                          addItemToCart={props.addToCart}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        //Loading
        <Box style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Box>
      )}
    </>
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
  },
  inputSearch: {
    fontSize: 18,
    width: "100%",
  },
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    flex: 1,
    height: height * 1.4,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
