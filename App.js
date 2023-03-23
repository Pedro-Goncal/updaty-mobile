import { View,} from "react-native";

import "expo-dev-client";

import "react-native-gesture-handler";


//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

import AdMobControllers from './AdMobControllers';

import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';


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



const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AdMobControllers />
      </View>
    </Provider>
  );
};

export default App;
