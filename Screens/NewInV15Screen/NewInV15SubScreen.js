import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");

const NewInV15SubScreen = () => {
  return (
    <View style={styles.container}>
      <Text>New in iOS 15 Sub Screen</Text>
    </View>
  );
};

export default NewInV15SubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 15,
    height: height,
  },
});
