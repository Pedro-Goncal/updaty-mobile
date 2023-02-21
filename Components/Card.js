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
    <TouchableOpacity style={styles.container}>
      <View>Card</View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});
