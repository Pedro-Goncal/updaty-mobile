import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";



const CardSmall15 = ({ content, index }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  
  const htmlSource = {
    html: content.htmlSmall,
  };

  const tagStyles = {
    img: {
      width: Platform.isPad ? 130 : 90,
      height: Platform.isPad ? 130 : 90,
      objectFit: "cover",
      borderRadius: 8,
      overflow: "hidden",
      
    },
    h1: {
      color: "#999",
      fontSize: Platform.isPad ? 26 : 14,
      fontFamily: "inter-regular",
    },
    h2: {
      fontSize: Platform.isPad ? 29 : 18,
      color: "#000",
      fontWeight: "bold",
      fontFamily: "inter-regular",
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
      paddingLeft: 6,
    },
    rightContainer: {
      paddingHorizontal: 12,
      width: "75%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  };


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(handleClick());
        navigation.navigate("NewInV15SubScreen", { index: index });
      }}
    >
      <View style={styles.left}>
      

        <Image
          source={content.img}
          height={Platform.isPad ? 130 : 90}
          width={Platform.isPad ? 130 : 90}
          style={styles.img}
          />
    
      </View>
      <View style={styles.right}>
        <Text style={styles.subTitle}>{content.subtitle}</Text>
        <Text style={styles.title}>{content.title}</Text>
      </View>
      {/* <RenderHtml
          contentWidth={width - 20}
          source={htmlSource}
          tagsStyles={tagStyles}
          classesStyles={classesStyles}
          enableExperimentalMarginCollapsing={true}
          bypassAnonymousTPhrasingNodes={true}

        /> */}
    </TouchableOpacity>
  );
};

export default CardSmall15;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: width - 20,
    backgroundColor: "#FFF",
    minHeight: 97,
    // padding: 2,
    flexDirection: "row",
    marginVertical: 4,
  },
  left: {
    // width: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  right: {
    paddingLeft: 8,
    paddingRight: 22,
    width: "75%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  img: {
    width: Platform.isPad ? 130 : 90,
    height: Platform.isPad ? 130 : 90,
    objectFit: "cover",
    borderRadius: 8,
 
    // overflow: "hidden",
  },
  title: {
    fontSize: Platform.isPad ? 29 : 18,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "inter-bold",
  },
  subTitle: {
    color: "#999",
    fontSize: Platform.isPad ? 26 : 14,
    fontFamily: "inter-regular",
    paddingTop: 16,
    paddingBottom: 3,
  },
});
