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

const PrepareScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PrepareScreen</Text>
    </View>
  );
};

export default PrepareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 15,
    height: height,
  },
});
