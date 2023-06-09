// importing dependencies
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Badge, Text } from "native-base";

// import data
import colors from "../../assets/common/colors";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ marginHorizontal: 10 }}
    >
      <TouchableOpacity
        key={1}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      >
        <Badge
          style={[
            styles.center,
            { margin: 5 },
            props.active == -1 ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.text}>All species</Text>
        </Badge>
      </TouchableOpacity>
      {props.categories
        .slice()
        .reverse()
        .map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={styles.text}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
  },
  inactive: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CategoryFilter;
