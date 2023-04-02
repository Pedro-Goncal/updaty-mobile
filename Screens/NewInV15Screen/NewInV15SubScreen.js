import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../Components/Card";

import { useRoute } from "@react-navigation/native";

//Content
import {newInV15SmallCardContent} from "./Content/newInV15Content";
import newInV15_1 from "./Content/newInV15_1.json";
import newInV15_2 from "./Content/newInV15_2.json";
import newInV15_3 from "./Content/newInV15_3.json";
import newInV15_4 from "./Content/newInV15_4.json";
import newInV15_5 from "./Content/newInV15_5.json";
import newInV15_6 from "./Content/newInV15_6.json";


import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { height } = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const NewInV15SubScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const [backBtnTitle, setBackBtnTitle] = useState("New in iOS 15");
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

  const dispatch = useDispatch();

  const [content, setContent] = useState(newInV15_1);
  useEffect(() => {
    if (index === 0) {
      setContent(newInV15_1);
    } else if (index === 1) {
      setContent(newInV15_2);
    } else if (index === 2) {
      setContent(newInV15_3);
    } else if (index === 3) {
      setContent(newInV15_4);
    } else if (index === 4) {
      setContent(newInV15_5);
    } else if (index === 5) {
      setContent(newInV15_6);
    }
  }, [index]);

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
          <ArrowSvg />

          <Text style={styles.title}>{newInV15SmallCardContent[index].subtitle}</Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            data={content}
            decelerationRate={0.9}
            snapToInterval={dimensions.screen.width} // Distance between each snap point
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
          />
        </View>
      </ScrollView>
      <Pagination content={content} activeCardId={activeCardId} />
    </View>
  );
};

export default NewInV15SubScreen;

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
    fontFamily: "inter-bold",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.isPad ? 20 : 10,
    paddingBottom:50,
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
