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
import Card from "../../Components/Card";

import { useRoute } from "@react-navigation/native";

//Content TEMP
import newInV16HTML from "../../utils/newInV16HTML.json";

import { ScrollView } from "react-native-gesture-handler";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { width, height } = Dimensions.get("window");

//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

import { AD_UNIT_INTERSTITIAL_ID } from "../../config/adMobConfig";
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const NewInV16SubScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const [isScrollEnabled, setIsScrollEnabled] = useState(true)
  const [loaded, setLoaded] = useState(false)


  const {fireAd} = useSelector(state => state.ad)


  
 
  
  const getItemLayout = (data, index) => ({
    length: width - 20, // width of an item in the list
    offset: width * index, // position of the item in the list
    index,
  });

  useEffect(() => {
    flatListRef.current.scrollToIndex({ index, animated: false });
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      dispatch(handleClick());
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowSvg />

          <Text style={styles.title}>New in iOS 16</Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            snapToInterval={width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            data={newInV16HTML}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            renderItem={({ item }) => <Card content={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
            onLayout={() =>
              flatListRef.current.scrollToIndex({ index, animated: false })
            }
          />
        </View>
      </ScrollView>
      <Pagination content={newInV16HTML} activeCardId={activeCardId} />
    </View>
  );
};

export default NewInV16SubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 20,
    height: height,
  },
  scrollView: { flex: 1 },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
  },
});
