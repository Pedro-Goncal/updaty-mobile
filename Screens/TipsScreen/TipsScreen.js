import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CardSmallTips from "./CardSmallTips";

import * as Localization from 'expo-localization';

import { tipsSmalCardContenten } from './Content/tipsContent-en';
import { tipsSmalCardContentzh } from './Content/tipsContent-zh';


const { height } = Dimensions.get("window");

const TipsScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const deviceLanguage = Localization.locale;

  const [content, setContent] = useState(tipsSmalCardContenten)


  useEffect(()=> {
    if(deviceLanguage.includes("zh")){
      setContent(tipsSmalCardContentzh)
    } else {
      setContent(tipsSmalCardContenten)
    }
  },[])


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tips</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={content}
          renderItem={({ item, index }) => (
            <CardSmallTips content={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      </View>
    </View>
  );
};

export default TipsScreen;

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
