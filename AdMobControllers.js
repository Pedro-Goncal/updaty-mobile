import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView,  } from 'react-native'
import { StatusBar } from "expo-status-bar";


const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');

import * as SplashScreen from 'expo-splash-screen'
import { useDispatch, useSelector } from "react-redux";
import { handleFirstLoad } from './Redux/slices/adSlice';

import { AD_UNIT_INTERSTITIAL_ID, AD_UNIT_ID } from "./config/adMobConfig";
import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';



import { NavigationContainer } from "@react-navigation/native";

import RoutesManager from "./Routes/RoutesManager";

const adMobControllers = () => {

    const [loaded, setLoaded] = useState(false)

    const dispatch = useDispatch()
  

    const {fireAd} = useSelector(state => state.ad)
    const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_INTERSTITIAL_ID );

    useEffect(() => {
      console.log("Use effect Run")
      const timeoutId = setTimeout(() => {
       dispatch(handleFirstLoad())
       console.log("Timeout fired")
      }, 30000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
    
    useEffect(() => {
      setLoaded(false)
 
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  
        setLoaded(true);
        if(fireAd){
          console.log("What up")
          interstitial.show()
        }
      });
  
      // Start loading the interstitial straight away
      interstitial.load();
  
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, [fireAd]);

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


  return (
    // <SafeAreaView style={{flex: 1}}>
      <NavigationContainer >
          

          <RoutesManager />
          <View
            style={{
              //   height: 100,
              width: dimensions.screen.width,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
              marginTop: 3,
            //  marginHorizontal: 20
            backgroundColor: "#ecf0f3"
            }}
            >
              <BannerAd
                unitId={AD_UNIT_ID} 
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                />

            </View>
          
               
        </NavigationContainer>
    // </SafeAreaView>
  )
}

export default adMobControllers

const styles = StyleSheet.create({})