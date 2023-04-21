import { StyleSheet, Text, View, Dimensions, Image, Platform, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');

const Initial = () => {

  const [dimensions, setDimensions] = useState({

    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({screen});
      },
    );
    return () => subscription?.remove();
  });

  console.log(dimensions.screen.width)

  

  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: Platform.isPad ? dimensions.screen.height - 370 : dimensions.screen.height - 300}]}>
      <ScrollView style={{flex: 1}}>
      <View style={{width:width}}>
        {dimensions.screen.width <376 ? (
          null
        ): (
          <Image
          style={styles.image}
          source={require("../../../assets/27.png")}
          height={!Platform.isPad ? 170 : 260}
          width={!Platform.isPad ? 170  : 260}
          resizeMode="contain"
          />
          )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>Time for an update?</Text>
        <Text style={styles.title}>
          Let's check for an update and prepare your system
        </Text>
        <Text style={styles.description}>
          Find out if your device can be updated and make the necessary
          preparations. Our Update Assistant will guide you through 5 easy
          steps. Swipe left to begin.
        </Text>
      </View>
        </ScrollView>
    </View>
  );
};

export default Initial;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 14,
    flex: 1,
 
   
  },
  image: {
    marginBottom: 24,

  },
  textContainer: {},
  subTitle: {
    color: "#607080",
    fontSize: Platform.isPad ? 24 : 16,
    paddingVertical: 8,
    fontFamily: 'inter-regular',
  },
  title: {
    fontSize: Platform.isPad ? 38 :26,
    fontWeight: "bold",
    paddingBottom: 10,
    fontFamily: 'inter-bold',
    },
  description: {
    fontSize: Platform.isPad ? 22 : 16,
    fontFamily: 'inter-regular',
    // lineHeight: 27,
  },
});
