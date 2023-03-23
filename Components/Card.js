import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import React , {useState, useEffect} from "react";

const { width, height } = Dimensions.get("window");

import RenderHtml from "react-native-render-html";


const tagStyles = {
  img: {
    width: "100%",
    objectFit: "cover",
    marginVertical: 10,
  },
  li: {
    paddingBottom: 10,
    fontStyle: "italic",
  },

 h1 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: 28

 },
 h2 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: 24,
  borderBottomColor: '#cccccc',
  borderBottomWidth: 1,

 },
 h3 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
fontSize: 18
 },
 h4 : {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 15,
  fontSize: 16

 },
 
 h5 : {
  marginTop: 20,
  marginBottom: 10,
  fontSize: 14

 },
 h6 : {
  marginTop: 20,
  marginBottom: 10,
  fontSize: 14,
  color: "#777777"
 },
 p: {
  paddingHorizontal: 15,
  marginTop: 15,
  fontSize: 16
 },
 hr: {
  marginTop: 10,
  border: "none",
  color: "#cccccc",
  height: 4,
  padding: 0
  }

};

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

const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true
  }
}


const Card = ({ content }) => {
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

  const calculatedHeight = height - "30%";

  return (
    <View style={styles.container}>
      {loading && (

        <View style={styles.spinner}>
        <ActivityIndicator />
      </View>
        )}
      <ScrollView style={{flex: 1}} >
        <RenderHtml
          contentWidth={width - 20}
          source={htmlSource}
          tagsStyles={tagStyles}
          classesStyles={classesStyles}
     
          renderersProps={renderersProps}
        />
    
      </ScrollView>
    </View>
  );
};


export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: width - 20,
    height: height / 1.6 ,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    paddingVertical: 10,
    position: "relative",
    overflow: "hidden" 
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


//FVW25T6ZYG