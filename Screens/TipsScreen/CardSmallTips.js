import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";



const { width } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const tagStyles = {
 
  img: {
    width: 90,
    height: 90,
    objectFit: "cover",
    borderRadius: 12,
    overflow: "hidden"
  },
  h1: {
    color: "#999",
    fontSize: 14,
 
  },
  h2: {
    fontSize: "18px",
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
    borderRadius: 18,
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
    width: width - 22,
    backgroundColor: "#FFF",
    minHeight: 90,
    padding: 2,
    flexDirection: "row",
    marginVertical: 6,
  },
});
