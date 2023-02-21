import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const NewInV16Screen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>New in iOS 16</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewInV16Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
});
