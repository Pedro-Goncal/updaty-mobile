import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../Components/Card";

import { useRoute } from "@react-navigation/native";

//Content
import { tipsSmalCardContent } from './Content/tipsContent-en';
import tip1 from "./Content/tip1.json";
import tips2 from "./Content/tips2.json";
import tips3 from "./Content/tips3.json";
import tips4 from "./Content/tips4.json";
import tips5 from "./Content/tips5.json";
import tips6 from "./Content/tips6.json";
import tips7 from "./Content/tips7.json";
import tips8 from "./Content/tips8.json";
import tips9 from "./Content/tips9.json";
import tips10 from "./Content/tips10.json";
import tips11 from "./Content/tips11.json";
import tips12 from "./Content/tips12.json";
import tips13 from "./Content/tips13.json";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowLeft from "../../assets/iconsSvg/ArrowLeft";

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
      setContent(tips2);
    } else if (index === 2) {
      setContent(tips3);
    } else if (index === 3) {
      setContent(tips4);
    } else if (index === 4) {
      setContent(tips5);
    } else if (index === 5) {
      setContent(tips6);
    } else if (index === 6) {
      setContent(tips7);
    } else if (index === 7) {
      setContent(tips8);
    } else if (index === 8) {
      setContent(tips9);
    } else if (index === 9) {
      setContent(tips10);
    } else if (index === 10) {
      setContent(tips11);
    } else if (index === 11) {
      setContent(tips12);
    } else if (index === 12) {
      setContent(tips13);
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
          <ArrowLeft />

          <Text style={styles.title}>{tipsSmalCardContent[index].subtitle}</Text>
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
      <Pagination content={content} activeCardId={activeCardId} />
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
    paddingTop: Platform.isPad ? 20 : 10,    paddingBottom: 50,
    overflow: "hidden",
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
