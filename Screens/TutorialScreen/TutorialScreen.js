import React, { useState, useRef, useEffect} from "react";
import {

  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";

//Components
import Card from "../../Components/Card";
import Pagination from "../../Components/Pagination";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";


//Content TEMP
import tutorialsHTML from "./Content/tutorialsHTML.json";


const { width, height } = Dimensions.get("screen");
const screenDimensions = Dimensions.get('screen');

const TutorialScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const dispatch = useDispatch();


  //Set viewability of each post based on the id of the post
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      dispatch(handleClick());
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const getItemLayout = (data, index) => ({
    length: dimensions.screen.width, // width of an item in the list
    offset: dimensions.screen.width * index, // position of the item in the list
    index,
  });

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


  const flatListRef = useRef(null);
  




  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <View>
          <Text style={styles.title}>Tutorial</Text>
        </View>
        <View style={styles.cardContainer}>
          
          <FlatList
            ref={flatListRef}
            data={tutorialsHTML}
            decelerationRate={0.9}
            snapToInterval={dimensions.screen.width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={1}
            renderItem={({ item }) => <Card content={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
            pagingEnabled
          />
        </View>
      </ScrollView>
      <Pagination content={tutorialsHTML} activeCardId={activeCardId} />
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
   
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: Platform.isPad ? 42 : 28,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 4,
    fontFamily: "inter-bold"
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 7.65,
  
  },
});
