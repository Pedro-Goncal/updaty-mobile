import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import React , {useState, useEffect} from "react";

const { width, height } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";


const tagStyles = {
  img: {
   
    objectFit: "fit",
    // marginVertical: 10,
    // margin: 6,
    width: width - 50,
    height: "100%", 
    borderRadius: 8,
    overflow: "hidden"
  },
  li: {
    paddingBottom: 10,
    fontStyle: "italic",
  },

 h1 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: Platform.isPad ? 38 :28

 },
 h2 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: Platform.isPad ? 38 : 26,
  borderBottomColor: '#cccccc',
  borderBottomWidth: 1,
  paddingBottom: 6

 },
 h3 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: Platform.isPad ? 30 : 18
 },
 h4 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: Platform.isPad ? 28 : 16

 },
 
 h5 : {
  marginTop: 20,
  marginBottom: 10,
  fontSize: Platform.isPad ? 26 : 14

 },
 h6 : {
  marginTop: 20,
  marginBottom: 10,
  fontSize: Platform.isPad ? 26 : 14,
  color: "#777777"
 },
 p: {
  paddingHorizontal: 15,
  marginTop: 15,
  fontSize: Platform.isPad ? 26 : 18
 },
 hr: {
  marginTop: 10,
  border: "none",
  color: "#cccccc",
  height: 4,
  padding: 0
  }

};

console.log(Platform.isPad)

const classesStyles = {
  subTitle: {
    color: "#999",
  },
  title: {
    fontSize: "22px",
    color: "#000",
    fontWeight: "bold",
  },
};


const screenDimensions = Dimensions.get('screen');

const Card = ({content}) => {
  const htmlSource = {
    html: `${content.html}`,
  };

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
     setLoading(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoaded = () => {
    setLoading(false)
  }

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




  
// const RenderersProps = {
//   img: {
//     enableExperimentalPercentWidth: true,
  
//   }
// }




  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: dimensions.screen.height - 320}]}>
      {loading && (

        <View style={styles.spinner}>
        <ActivityIndicator />
      </View>
        )}
      <ScrollView style={{flex: 1}} >
        <RenderHtml
          contentWidth={dimensions.screen.width - 20}
          source={htmlSource}
          tagsStyles={tagStyles}
          classesStyles={classesStyles}
          // renderersProps={RenderersProps}
        />
    
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 50,
    position: "relative",
    overflow: "hidden" ,
  },
  spinner: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#FFF",
    width: width - 20,
    height: height - 320,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  subTitleContainer: {},
  subTitle: {
    color: "#607080",
    fontSize: 14,
  },
  titleContainer: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingTop: 5,
  },
  content: {
    fontSize: 16,
  },
  imgContainer: {
    marginTop: 10,
  },
  img: {
    width: "100%",
    minHeight: 175,
    objectFit: "cover",
    borderRadius: 20,
  },
});