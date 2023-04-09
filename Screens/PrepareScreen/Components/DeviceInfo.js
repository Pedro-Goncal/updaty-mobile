import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Platform, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');
//TODO - Check with Nikolaus if we want to be super

import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";

//Assets
import checkGreen from '../../../assets/iconsSvg/checkGreen.png'
import checkRed from '../../../assets/iconsSvg/checkRed.png'
import checkYellow from '../../../assets/iconsSvg/checkYellow.png'
import axios from "axios";



const DeviceInfo = ( ) => {

  const [isWIFIConnected, setIsWIFIConnected] = useState(false)

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
 
  useEffect(() => {

    // NetInfo.fetch().then(state => {
    //   setIsWIFIConnected(state.isConnected && state.type === "wifi");
    // });
   
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsWIFIConnected(state.isConnected && state.type === "wifi");
    });

    

    return () => {
      unsubscribe();
    };
  }, [NetInfo]);

  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [maxOsUpdate, setMaxOsUpdate] = useState("SUUp");

  const [latestiOSAvailable, setLatestiOSAvailable] = useState("")

  useEffect(() => {

    //Here we use the https://ipsw.me/ API and the modelID to retrive the latest avaialble iOS version
    const fetched = async() => {
      try {
        await axios.get(`https://api.ipsw.me/v4/device/${Device.modelId}?variant=latest`).then(res => {
       
  
          if(Device.osVersion.toString() === res.data.firmwares[0].version){
      
            setIsUpdateAvailable(false)
            setMaxOsUpdate(res.data.firmwares[0].version)
          } else{
            console.log("YOU ARE NOT");
            setIsUpdateAvailable(true)
            setMaxOsUpdate(res.data.firmwares[0].version)
          }

        })
       
      } catch (error) {
        setLatestiOSAvailable('N/A')
        console.log("Error fetching iOS vertsion",error)
      }
    } 
  
    fetched()
  }, [Device]);






  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: Platform.isPad ? dimensions.screen.height - 370 : dimensions.screen.height - 300}]}>
      <ScrollView style={{flex:1}}>

      
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Step 1 of 5</Text>
        <Text style={styles.title}>Info about your device</Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Row 1*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Your device</Text>
          <Text style={styles.rightText}>{Device.modelName}</Text>
        </View>
        {/* Row 2 */}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Current iOS version</Text>
          <Text style={styles.rightText}>{Device.osVersion}</Text>
        </View>
        {/* Row 3 */}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Supported iOS version</Text>
          <Text style={styles.rightText}>{maxOsUpdate}</Text>
        </View>
        {/* Row 4 */}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Wi-Fi state</Text>
          <Text style={styles.rightText}>
            {isWIFIConnected ? "connected" : "not connected"}
          </Text>
        </View>
        {/* Messages  */}
        <View style={styles.msgsContainer}>
          {/* Update message */}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: isUpdateAvailable
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(255,170,34,.1)",
                marginBottom: 6,
                marginTop: 6,
              },
            ]}
          >
              {isUpdateAvailable &&  (
              <Image
                source={checkGreen}
                style={{ width: 20, height: 20 }}
              />

            )} 
            
            {!isUpdateAvailable &&(
              <Image
                source={checkYellow}
                style={{ width: 20, height: 20 }}
            />
            )}
            <Text style={styles.msgText}>
              {isUpdateAvailable
                ? "Update available"
                : "No Update available. You're already running the latest version!"}
            </Text>
          </View>

          {/* Wi-Fi Message */}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: isWIFIConnected
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(187,17,51,.1)",
              },
            ]}
          >
            {isWIFIConnected &&  (
              <Image
                source={checkGreen}
                style={{ width: 20, height: 20 }}
              />

            )} 
            
            {!isWIFIConnected &&(
              <Image
                source={checkRed}
                style={{ width: 20, height: 20 }}
            />
            )}
            <Text style={styles.msgText}>
              {isWIFIConnected ? "Wi-Fi connected" : "Please connect to Wi-Fi"}
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default DeviceInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,

    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 14,
  },
  titleContainer: {
    paddingBottom: 20,
  },
  subTitle: {
    color: "#607080",
    fontSize: Platform.isPad ? 22 : 14,
    paddingBottom: 6,
    fontFamily: 'inter-regular',
  },
  title: {
    fontSize: Platform.isPad ? 36 :22,
    fontWeight: "bold",
    fontFamily: 'inter-bold',
  },
  infoContainer: {},
  row: {
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  leftText: {
    fontSize: Platform.isPad ? 22 : 16,
    fontFamily: 'inter-regular',
  },
  rightText: {
    fontSize: Platform.isPad ? 22 : 16,
    fontWeight: "bold",
    fontFamily: 'inter-bold',
  },
  msgsContainer: {},
  statusContainer: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
    borderRadius: 8,
  },
  msgText: {
    fontSize: Platform.isPad ? 22 :16 ,
    fontWeight: "bold",
    paddingLeft: 10,
    width: "94%",
    fontFamily: 'inter-bold',
  },
});
