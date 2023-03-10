import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const { width, height } = Dimensions.get("window");

const html = `
<html>
<div class=container>
  <div class=imgContainer>
    <img src=https://images.unsplash.com/photo-1585060282215-39a72f82385c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2087&q=80 alt=placeholder >
  </div>
 <div class=rightContainer>
      <p class=subTitle >Subtitle Lorem ipsum</p> 
      <p class=title>This is a long title dolor sit amet sed do 3</p>
 </div>
</div>
</html>
`


import RenderHtml from "react-native-render-html";

const tagStyles = {
  img: {
    width: 90,
    height: 90,
    objectFit: "cover",
    borderRadius: 12,
    overflow: "hidden"
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
    
    
  },
  subTitle: {
    color: "#999",
    fontSize: 14,
 
  },
  title: {
    fontSize: "18px",
    color: "#000",
    fontWeight: "bold",

  },
};

const CardSmall16 = ({ content, index }) => {
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
        navigation.navigate("NewInV16SubScreen", { index: index });
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

export default CardSmall16;

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
