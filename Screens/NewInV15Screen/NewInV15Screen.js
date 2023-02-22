import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";

const { width, height } = Dimensions.get("window");

const NewInV15Screen = () => {
  return (
    <View style={styles.container}>
      <Text>New in iOS 15</Text>
    </View>
  );
};

export default NewInV15Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 15,
    height: height,
  },
});
