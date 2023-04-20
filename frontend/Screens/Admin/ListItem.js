// import dependencies
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { Box, HStack, Input, Icon } from "native-base";

// screen width definition
var { width } = Dimensions.get("window");
import { LogBox } from "react-native";
// import styles
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const ListItem = (props) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              underlayColor="#e8e8e8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableHighlight>

            <EasyButton
              medium
              secondary
              onPress={() => {
                console.log("PROPS IN NAV", props);
                navigation.navigate("ProductForm", { item: props }),
                  setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>

            <EasyButton
              medium
              danger
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => [
          props.navigation.navigate("Product Detail", { item: props }),
          setModalVisible(false),
        ]}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          { backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro" },
        ]}
      >
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg",
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item} numberOfLines={1}>
          {props.brand}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>$ {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderColor: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    marginVertical: 3,
    marginHorizontal: 2,
    width: width / 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListItem;
