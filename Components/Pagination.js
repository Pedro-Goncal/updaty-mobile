import { StyleSheet, Text, View, Dimensions } from "react-native";
import React , {useState, useEffect} from "react";

const { width, height } = Dimensions.get("window");

const Pagination = ({ content, activeCardId }) => {
  const [sliceStart, setSliceStart] = useState(0);

  useEffect(() => {
    const index = content.findIndex((item) => item.id === activeCardId);
    const start = Math.max(0, index - 3);
    setSliceStart(start);
  }, [content, activeCardId]);
  
  const shouldShowFiveDots = content.length > 4;
  
  return (
    <View style={styles.paginationContainer}>
      <View
        style={[
          styles.paginationBox,
          { backgroundColor: "rgba(255,255,255,0.5)" },
        ]}
      >
        {sliceStart > 0 &&(
          <View
        
          style={[
            styles.dotSmall,
            { backgroundColor:"gray"},
          ]}
        />)}
        {content.slice(sliceStart, shouldShowFiveDots ? sliceStart + 4 : undefined).map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeCardId === item.id ? "#d72c16" : "gray",
              },
            ]}
          />
        ))}
        {shouldShowFiveDots && content.length > sliceStart + 4 && (
        
        <View
          
            style={[
              styles.dotSmall,
              {
                backgroundColor:
                   "gray",
              },
            ]}
          />
        )}
      </View>
    </View>
  );

}
  
  
  
  
  
export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    width: "100%",
  },
  paginationBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 4,
    maxWidth: width - 50,
    overflow: "hidden"

  },
  dot: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 5,
    margin: 10,
    marginHorizontal: 5,
  },
  dotSmall: {
    width: 7,
    aspectRatio: 1,
    borderRadius: 5,
    margin: 10,
    marginHorizontal: 5,
  }
});
