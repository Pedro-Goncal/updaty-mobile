import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import CardSmall15 from "./CardSmall15";

//Content TEMP
import newInV15HTML from "../../utils/newInV15HTML.json";
import newInV15SmallCardContent from "./Content/newInV15Content";

const { width, height } = Dimensions.get("window");

const NewInV15Screen = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New in iOS 15</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={newInV15SmallCardContent}
          renderItem={({ item, index }) => (
            <CardSmall15 content={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      </View>
    </View>
  );
};

export default NewInV15Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: Platform.isPad ? 42 : 28,
    fontFamily: "Helvetica Neue",
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 60,
  },
});
