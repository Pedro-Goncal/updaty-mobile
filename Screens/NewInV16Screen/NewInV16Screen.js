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

import CardSmall16 from "./CardSmall16";



//Content TEMP
import newInV16HTML from "../../utils/newInV16HTML.json";

const { width, height } = Dimensions.get("window");

const NewInV16Screen = () => {
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
        <Text style={styles.title}>New in iOS V16</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={newInV16HTML}
          renderItem={({ item, index }) => (
            <CardSmall16 content={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      </View>
    </View>
  );
};

export default NewInV16Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: Platform.isPad ? 42 :28,

    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 60,
  },
});
