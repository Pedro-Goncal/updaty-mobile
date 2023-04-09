import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../Components/Card";

import { useRoute } from "@react-navigation/native";

//Content
import {newInV16SmallCardContenten} from "./Content/newInV16Content-en";
import {newInV16SmallCardContentzh} from "./Content/newInV16Content-zh";


import newInV16_1en from "./Content/newInV16_1-en.json";
import newInV16_2en from "./Content/newInV16_2-en.json";
import newInV16_3en from "./Content/newInV16_3-en.json";
import newInV16_4en from "./Content/newInV16_4-en.json";
import newInV16_5en from "./Content/newInV16_5-en.json";
import newInV16_6en from "./Content/newInV16_6-en.json";
import newInV16_1zh from "./Content/newInV16_1-zh.json";
import newInV16_2zh from "./Content/newInV16_2-zh.json";
import newInV16_3zh from "./Content/newInV16_3-zh.json";
import newInV16_4zh from "./Content/newInV16_4-zh.json";
import newInV16_5zh from "./Content/newInV16_5-zh.json";
import newInV16_6zh from "./Content/newInV16_6-zh.json";

import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowLeft from "../../assets/iconsSvg/ArrowLeft";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

import { getLocales } from 'expo-localization';

import { AD_UNIT_INTERSTITIAL_ID } from "../../config/adMobConfig";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const NewInV16SubScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

  const local = getLocales()
  const localeVar = local[0].languageCode

  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  console.log(newInV16_1zh)


  const [content, setContent] = useState(newInV16_1en)


  useEffect(() => {
    if(!localeVar) return
    if (index === 0) {
      setContent(localeVar === "en" ? newInV16_1en : newInV16_1zh);
    } else if (index === 1) {
      setContent(localeVar === "en" ? newInV16_2en : newInV16_2zh);
    } else if (index === 2) {
      setContent(localeVar === "en" ? newInV16_3en : newInV16_3zh);
    } else if (index === 3) {
      setContent(localeVar === "en" ? newInV16_4en : newInV16_4zh);
    } else if (index === 4) {
      setContent(localeVar === "en" ? newInV16_5en : newInV16_5zh);
    } else if (index === 5) {
      setContent(localeVar === "en" ? newInV16_6en : newInV16_6zh);
    }
  }, [index,localeVar]);

  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { fireAd } = useSelector((state) => state.ad);

  const getItemLayout = (data, index) => ({
    length: dimensions.screen.width, // width of an item in the list
    offset: dimensions.screen.width * index, // position of the item in the list
    index,
  });

  // useEffect(() => {
  //   flatListRef.current.scrollToIndex({ index, animated: false });
  // }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      dispatch(handleClick());
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const [dimensions, setDimensions] = useState({
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ screen });
      }
    );
    return () => subscription?.remove();
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft/>

          <Text style={styles.title}>{localeVar === "en" ? newInV16SmallCardContenten[index].subtitle : newInV16SmallCardContentzh[index].subtitle}</Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            // onScroll={handleScroll}
            decelerationRate={0.9}
            snapToInterval={dimensions.screen.width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            data={content}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            renderItem={({ item }) => <Card content={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
            // onLayout={() =>
            //   flatListRef.current.scrollToIndex({ index, animated: false })
            // }
          />
        </View>
      </ScrollView>
      <Pagination content={content} activeCardId={activeCardId} />
    </View>
  );
};

export default NewInV16SubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
  },
  scrollView: { flex: 1 },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: Platform.isPad ? 28 : 18,
    fontWeight: "bold",
    paddingHorizontal: 6,
    fontFamily: "Helvetica Neue",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.isPad ? 20 : 10,
    paddingBottom: 50,
     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 7.65,
    marginBottom: 20,
  },
});
