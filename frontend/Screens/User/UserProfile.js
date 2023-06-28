// import dependencies
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Box } from "native-base";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

// import data
import baseURL from "../../assets/common/baseUrl";
import colors from "../../assets/common/colors";

// import context API
import UserContext from "../../Context/UserContext";

// import actions
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const UserProfile = (props) => {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState();
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    const { navigation } = props;
    userContext.setUser(null);
    navigation.navigate("Login");
  };

  useEffect(() => {
    // users
    axios
      .get(`${baseURL}users/${userContext.user?.userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });

    // species added by user
    axios
      .get(`${baseURL}species/usersFilter?users=${userContext.user?.userId}`)
      .then((res) => {
        setSpecies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching species data: ", error);
      });

  }, [userContext.refresh]);

  return (
    <>
      {loading == false ? (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: user?.photoUser
                  ? user.photoUser
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
              }}
            />
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{user?.name}</Text>

              <View style={styles.info}>
                <Text style={styles.others}>Email: {user?.email}</Text>
                <Text style={styles.others}>Country: {user?.country}</Text>
                <Text style={styles.others}>
                  Profession: {user?.profession}
                </Text>

                {user?.isAdmin ? (
                  <View style={styles.adminContainer}>
                    <Text style={styles.admin}>Admin user</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.contributionsContainer}>
            <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
              Your contributions.
            </Text>
            <Text style={[styles.others, { textAlign: "justify" }]}>
              {species.length > 0
                ? `You have added ${species.length} species. Keep it up! The community thanks you.`
                : "You haven't added any species yet! We encourage you to do so and to contribute to the community."}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <EasyButton
              secondary
              large
              onPress={() => {
                props.navigation.navigate("UserForm");
                //userContext.setRefresh(!userContext.refresh);
              }}
              style={{ marginBottom: 20 }}
            >
              <Text style={{ color: "white" }}>Edit your profile</Text>
            </EasyButton>
            <EasyButton danger large onPress={() => logOut()}>
              <Text style={{ color: "white" }}>Close session</Text>
            </EasyButton>
          </View>
        </View>
      ) : (
        //Loading
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          bgColor="#515760"
        >
          <ActivityIndicator
            size="large"
            backgroundColor="#515760"
            color="#5cb85c"
          />
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 40,
  },
  content: {
    width: "80%",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color:  colors.grey,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.grey,
    fontSize: 20,
  },
  info: {
    marginVertical: 20,
  },
  others: {
    color: colors.grey,
    fontSize: 18,
  },
  adminContainer: {
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 10,
  },
  admin: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 600,
    borderColor: "#e0e0e0",
    backgroundColor: "#B0B0B0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 600,
  },
  imagePicker: {
    position: "absolute",
    right: 20,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  contributionsContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 40,
  },
});

export default UserProfile;
