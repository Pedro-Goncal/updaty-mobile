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

const TipsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tips</Text>
    </View>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 15,
    height: height,
  },
});
