import {
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
import tipsHTML from "../../utils/tipsHTML.json";

import tip1 from "./Content/tip1.json";
import tip2 from "./Content/tip2.json";
import tip3 from "./Content/tip3.json";
import tip4 from "./Content/tip4.json";
import tip5 from "./Content/tip5.json";
import tip6 from "./Content/tip6.json";
import tip7 from "./Content/tip7.json";
import tip8 from "./Content/tip8.json";
import tip9 from "./Content/tip9.json";
import tip10 from "./Content/tip10.json";
import tip11 from "./Content/tip11.json";
import tip12 from "./Content/tip12.json";
import tip13 from "./Content/tip13.json";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const TipsSubScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

  const [content, setContent] = useState(tip1);

  useEffect(() => {
    if (index === 0) {
      setContent(tip1);
    } else if (index === 1) {
      setContent(tip2);
    } else if (index === 2) {
      setContent(tip3);
    } else if (index === 3) {
      setContent(tip4);
    } else if (index === 4) {
      setContent(tip5);
    } else if (index === 5) {
      setContent(tip6);
    } else if (index === 6) {
      setContent(tip7);
    } else if (index === 7) {
      setContent(tip8);
    } else if (index === 8) {
      setContent(tip9);
    } else if (index === 9) {
      setContent(tip10);
    } else if (index === 10) {
      setContent(tip11);
    } else if (index === 11) {
      setContent(tip12);
    } else if (index === 12) {
      setContent(tip13);
    }
  }, [index]);

  const dispatch = useDispatch();

  const flatListRef = useRef(null);

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

  const [heights, setHeights] = useState([]);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const newHeights = tipsHTML.map(() => contentHeight);
    setHeights(newHeights);
  };

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
          <ArrowSvg />

          <Text style={styles.title}>Tips</Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            decelerationRate={0.9}
            snapToInterval={dimensions.screen.width} // Distance between each snap point
            data={content}
            snapToAlignment={"center"} // Align snap point to the center of the view
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
            // onContentSizeChange={handleContentSizeChange}
          />
        </View>
      </ScrollView>
      <Pagination content={tipsHTML} activeCardId={activeCardId} />
    </View>
  );
};

export default TipsSubScreen;

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
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 6,
    fontFamily: "Helvetica Neue",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
    overflow: "hidden",
  },
});
