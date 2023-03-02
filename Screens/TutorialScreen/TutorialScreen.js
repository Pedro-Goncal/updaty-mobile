import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../Components/Card";
// import DeviceInfo from "react-native-device-info";

//Content TEMP
import content from "../../utils/content.json";
import { ScrollView } from "react-native-gesture-handler";
import Pagination from "../../Components/Pagination";

const { width, height } = Dimensions.get("window");

const TutorialScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  //Set viewability of each post based on the id of the post
  //This allows us to pass in a varible activePostId to the FeedPost
  //With that we can tell our video player if the post is vissible or not
  //so we can pause it when it is NOT visible.
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const getItemLayout = (data, index) => ({
    length: width - 20, // width of an item in the list
    offset: width * index, // position of the item in the list
    index,
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text style={styles.title}>Tutorials</Text>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            data={content}
            snapToInterval={width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={content.length / 6}
            renderItem={({ item }) => <Card content={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
          />
        </View>
      </ScrollView>
      <Pagination content={content} activeCardId={activeCardId} />
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: height / 15,
    height: height,
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
  },
});
