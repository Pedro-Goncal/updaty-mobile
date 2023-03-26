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
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../../Components/Pagination";
import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');


//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";


const TipsSubScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

  const dispatch = useDispatch();

  const flatListRef = useRef(null);

  const getItemLayout = (data, index) => ({
    length: dimensions.screen.width - 20, // width of an item in the list
    offset: dimensions.screen.width * index, // position of the item in the list
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
      'change',
      ({window, screen}) => {
        setDimensions({screen});
      },
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
            data={tipsHTML}
            snapToAlignment={"center"} // Align snap point to the center of the view
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
            onContentSizeChange={handleContentSizeChange}

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
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
    overflow: "hidden"
  },
});
