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
import React, { useState, useRef, useEffect } from "react";

import CardSmall16 from "./CardSmall16";

import * as Localization from 'expo-localization';


import {newInV16SmallCardContenten} from "./Content/newInV16Content-en";
import {newInV16SmallCardContentzh} from "./Content/newInV16Content-zh";

const { width, height } = Dimensions.get("window");

const NewInV16Screen = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  const deviceLanguage = Localization.locale;


  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const [content, setContent] = useState(newInV16SmallCardContenten)


  useEffect(()=> {
    if(deviceLanguage.includes("zh")){
      setContent(newInV16SmallCardContentzh)
    } else {
      setContent(newInV16SmallCardContenten)
    }
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New in iOS 16</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={content}
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
    height: "100%",
 
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
    paddingTop: 5,
    paddingBottom: 40,
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
