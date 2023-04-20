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

import * as Localization from 'expo-localization';


//Content
import { tipsSmalCardContenten } from './Content/tipsContent-en';
import { tipsSmalCardContentzh } from './Content/tipsContent-zh';

import tip1en from "./Content/tip1-en.json";
import tips2en from "./Content/tips2-en.json";
import tips3en from "./Content/tips3-en.json";
import tips4en from "./Content/tips4-en.json";
import tips5en from "./Content/tips5-en.json";
import tips6en from "./Content/tips6-en.json";
import tips7en from "./Content/tips7-en.json";
import tips8en from "./Content/tips8-en.json";
import tips9en from "./Content/tips9-en.json";
import tips10en from "./Content/tips10-en.json";
import tips11en from "./Content/tips11-en.json";
import tips12en from "./Content/tips12-en.json";
import tips13en from "./Content/tips13-en.json";

import tip1zh from "./Content/tip1-zh.json";
import tips2zh from "./Content/tips2-zh.json";
import tips3zh from "./Content/tips3-zh.json";
import tips4zh from "./Content/tips4-zh.json";
import tips5zh from "./Content/tips5-zh.json";
import tips6zh from "./Content/tips6-zh.json";
import tips7zh from "./Content/tips7-zh.json";
import tips8zh from "./Content/tips8-zh.json";
import tips9zh from "./Content/tips9-zh.json";
import tips10zh from "./Content/tips10-zh.json";
import tips11zh from "./Content/tips11-zh.json";
import tips12zh from "./Content/tips12-zh.json";
import tips13zh from "./Content/tips13-zh.json";

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

  const [content, setContent] = useState(tip1en);



  useEffect(() => {
    if (index === 0) {
      setContent(Localization.locale.includes("zh") ? tip1zh: tip1en);
    } else if (index === 1) {
      setContent(Localization.locale.includes("zh") ? tips2zh : tips2en);
    } else if (index === 2) {
      setContent(Localization.locale.includes("zh") ? tips3zh : tips3en);
    } else if (index === 3) {
      setContent(Localization.locale.includes("zh") ? tips4zh : tips4en);
    } else if (index === 4) {
      setContent(Localization.locale.includes("zh") ? tips5zh : tips5en);
    } else if (index === 5) {
      setContent(Localization.locale.includes("zh") ? tips6zh : tips6en);
    } else if (index === 6) {
      setContent(Localization.locale.includes("zh") ? tips7zh : tips7en);
    } else if (index === 7) {
      setContent(Localization.locale.includes("zh") ? tips8zh : tips8en);
    } else if (index === 8) {
      setContent(Localization.locale.includes("zh") ? tips9zh : tips9en);
    } else if (index === 9) {
      setContent(Localization.locale.includes("zh") ? tips10zh : tips10en);
    } else if (index === 10) {
      setContent(Localization.locale.includes("zh") ? tips11zh : tips11en);
    } else if (index === 11) {
      setContent(Localization.locale.includes("zh") ? tips12zh : tips12en);
    } else if (index === 12) {
      setContent(Localization.locale.includes("zh") ? tips13zh : tips13en);
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

          <Text style={styles.title}>{Localization.locale.includes("zh") ? tipsSmalCardContentzh[index].subtitle : tipsSmalCardContenten[index].subtitle}</Text>
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
