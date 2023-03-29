import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import React , {useState, useEffect} from "react";

const { width, height } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";



const tagStyles = {
  img: {
    objectFit: "contain",
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
  fontFamily: 'Helvetica Neue'
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
  // marginTop: 15,
  fontSize: Platform.isPad ? 26 : 18,
  fontFamily: 'Helvetica Neue',
  // fontWeight: "bold"
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
    fontSize: Platform.isPad ? 38 : 26,
    color: "#000",
    fontFamily: 'Helvetica Neue',
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

const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

const onImageLoad = (event) => {
  const { width, height } = event.nativeEvent.source;
  setImageSize({ width, height });
};

console.log("=======>",imageSize)


  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: dimensions.screen.height - 300}]}>
      {/* {loading && (

        <View style={styles.spinner}>
        <ActivityIndicator />
      </View>
        )} */}
      <ScrollView style={styles.scrollView} >
        <RenderHtml
          contentWidth={dimensions.screen.width - 20}
          source={htmlSource}
          tagsStyles={tagStyles}
          classesStyles={classesStyles}
          // renderersProps={RenderersProps}
        />

        {/* <View>
          <Text style={styles.title}>{content.title}</Text>
        </View>
        {content.text1 && (
          <View>
          <Text style={styles.text}>{content.text1}</Text>
        </View>
        )}
        {content.img1 && (
          <View style={[styles.imgContainer]}>
          <Image style={styles.img} source={content.img1} onLoad={onImageLoad} />
        </View>
        )}
          {content.text2 && (
          <View>
          <Text style={styles.text}>{content.text2}</Text>
        </View>
        )}
        {content.img2 && (
          <View>
          <Image source={content.img2}  />
        </View>
        )}
        {content.text3 && (
          <View>
          <Text style={styles.text}>{content.text2}</Text>
        </View>
        )}
           {content.text4 && (
          <View>
          <Text style={styles.text}>{content.text2}</Text>
        </View>
        )} */}
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
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
  container: {
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    // marginBottom: 16,
    paddingBottom: 12,
    // marginBottom: 50,
    flex:1,

    // position: "relative",
    overflow: "hidden" ,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,

    // paddingBottom: 20
  },
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    fontFamily: 'Helvetica Neue',

  },
  imgContainer: {
    // width: width- 50,
    minHeight: "100%",
    backgroundColor: "red",
    borderRadius: 8,
    overflow: "hidden",
  },
  img: {
    // marginVertical: 10,
    height: undefined,
    width: '100%',
    borderRadius: 8,
    overflow: "hidden",
    resizeMode: 'contain',
    flex: 1
    // aspectRatio:1,
   
  },
  text: {
  paddingHorizontal: 15,
  marginTop: 15,
  fontSize: Platform.isPad ? 26 : 18,
  fontFamily: 'Helvetica Neue',
  }
});