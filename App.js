import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import "expo-dev-client";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import RoutesManager from "./Routes/RoutesManager";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// import {BannerAd, BannerAdSize, TestId} from 'react-native-google-mobile-ads'
import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { useEffect, useState } from "react";

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
    console.log('request config successfully set ===');
  });

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log('initialization complete ===', adapterStatuses);
  });

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8580824143358427~8104395596';
const adUnitInterstitialId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitInterstitialId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const App = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('unsubscribe ===', unsubscribe);
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar />
          <RoutesManager />
          <View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "rgba(222,222,222,.4)",
              borderWidth: 1,
            }}
          >
            <Button
              title="Show Interstitial"
              onPress={() => {
                loaded && interstitial.show();
              }}
            />
            <Text>Add Banner</Text>
            <View style={{
              // flex: 1,
              // width: '100%',
              top: 20,
              height: 100,
              // backgroundColor: 'red'
            }}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />

            </View>
          </View>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
