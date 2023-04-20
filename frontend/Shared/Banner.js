// import dependencies
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper/src";

// screen width definition
var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://cdn.pixabay.com/photo/2019/01/02/18/43/fruit-basket-3909414_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={4}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  style={styles.imageBanner}
                  key={item}
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 30,
    borderRadius: 15,
    marginHorizontal: 15,
  },
});

export default Banner;
