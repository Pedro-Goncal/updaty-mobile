import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";



const { width } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const tagStyles = {
 
  img: {
    width: Platform.isPad ?  130 : 90,
    height: Platform.isPad ?  130 : 90,
    objectFit: "cover",
    borderRadius: 8,
    overflow: "hidden"
  },
  h1: {
    color: "#999",
    fontSize: Platform.isPad ?  26: 14,
 
  },
  h2: {
    fontSize: Platform.isPad ? 29 : 18,
    color: "#000",
    fontWeight: "bold",
  },  
};

const classesStyles = {

  container: {
    flexDirection: "row",
    minHeight: 90,
  
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingLeft: 6
  },
  rightContainer: {
    paddingHorizontal: 12,
    width: "75%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    
    
  }
};

const CardSmallTips = ({ content, index }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const htmlSource = {
    html: content.htmlSmall,
  };


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
      dispatch(handleClick());
        navigation.navigate("TipsSubScreen", { index: index });
      }}
    >
       <RenderHtml
          contentWidth={width - 20}
          source={htmlSource}
          tagsStyles={tagStyles}
          classesStyles={classesStyles}
          enableExperimentalMarginCollapsing={true}
          bypassAnonymousTPhrasingNodes={true}

        />
    </TouchableOpacity>
  );
};

export default CardSmallTips;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: width - 30,
    backgroundColor: "#FFF",
    minHeight: 90,
    padding: 2,
    flexDirection: "row",
    marginVertical: 6,
  },
});
