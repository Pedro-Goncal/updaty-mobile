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
import Card from "../../Components/Card";

//Content TEMP
import content from "../../utils/content.json";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const TutorialScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Tutorials Screen</Text>
      </View>
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 20,
    height: height,
  },
});
