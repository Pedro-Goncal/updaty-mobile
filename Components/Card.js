import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { concatString } from "../utils/utilFunctions";

const { width, height } = Dimensions.get("window");

const Card = ({ content }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{content.subTitle}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{content.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content.content}</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: content.imgUrl }} style={styles.img} />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    // minHeight: height,
    padding: 20,
    // justifyContent: "space-between",

    //  shadowColor: "#000",
    //  shadowOffset: {
    //    width: 0,
    //    height: 4,
    //  },
    //  shadowOpacity: 0.3,
    //  shadowRadius: 4.65,

    //  elevation: 8,
  },
  subTitleContainer: {},
  subTitle: {
    color: "#607080",
    fontSize: 14,
  },
  titleContainer: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingTop: 5,
  },
  content: {
    fontSize: 16,
  },
  imgContainer: {
    marginTop: 20,
  },
  img: {
    width: "100%",
    minHeight: 175,
    objectFit: "cover",
    borderRadius: 20,
  },
});
