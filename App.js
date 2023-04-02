
import { View} from "react-native";

import "expo-dev-client";

import "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen'

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import * as Font from 'expo-font';


import AdMobControllers from './AdMobControllers';

import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { useEffect } from 'react';


mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  
  });

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log('initialization complete ===', adapterStatuses);
  });

  const customFonts = {
    'inter-regular': require('./assets/fonts/Inter-Regular.ttf'),
    'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
  };
  
  async function loadCustomFonts() {
    await Font.loadAsync(customFonts);
  }





const App = () => {
  useEffect(() => {
    const prepare = async () => {
      // keep splash screen visible
      await SplashScreen.preventAutoHideAsync()

      // pre-load your stuff
      await new Promise(resolve => setTimeout(resolve, 2000))

      // hide splash screen
      await SplashScreen.hideAsync()
    }
    prepare()
  }, [])



  loadCustomFonts();
  return (
    <Provider store={store}>
      <View style={{ flex: 1 , backgroundColor: "#ecf0f3"}}>
        <AdMobControllers />
      </View>
    </Provider>
  );
};

export default App;
