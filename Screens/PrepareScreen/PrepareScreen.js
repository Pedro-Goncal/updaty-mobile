import {

  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');


//components
import Initial from "./Components/Initial";
import DeviceInfo from "./Components/DeviceInfo";
import Storageinfo from "./Components/Storageinfo";
import BackupInfo from "./Components/BackupInfo";
import ChargingInfo from "./Components/ChargingInfo";
import FinalInfo from "./Components/FinalInfo";
import Pagination from "../../Components/Pagination";

//Device info
import NetInfo from "@react-native-community/netinfo";
import * as Battery from "expo-battery";
import * as Device from "expo-device";

//Redux
import { useDispatch } from "react-redux";
import { handleClick } from "../../Redux/slices/adSlice";

const data = [
  { id: 1, title: "Initial" },
  { id: 2, title: "Step 1" },
  { id: 3, title: "Step 2" },
  { id: 4, title: "Step 3" },
  { id: 5, title: "Step 4" },
  { id: 6, title: "Step 5" },
];

const PrepareScreen = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  //UPDATE INFO
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [maxOsUpdate, setMaxOsUpdate] = useState("16.3");
  //WI-FI INFO
  const [isWIFIConnected, setIsWIFIConnected] = useState(false);
  //BACK UP INFO
  const [hasBackupCheck, setHasBackupCheck] = useState(false);
  //STORAGE INFO
  const [hasEnoughStorageCheck, setHasEnoughStorageCheck] = useState(false);
  //CHARGING INFO
  const [isDeviceCharging, setIsDeviceCharging] = useState(false);

  const dispatch = useDispatch();

  //Get item in view
  

  //=========================================================
  //Card visibility and seting up pagination
  //Set viewability of each post based on the id of the post
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      dispatch(handleClick());
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const getItemLayout = (data, index) => ({
    length: dimensions.screen.width - 20, // width of an item in the list
    offset: dimensions.screen.width * index, // position of the item in the list
    index,
  });

  //=========================================================

  //=========================================================
  //WI-FI AND OS INFO
  //=========================================================

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsWIFIConnected(state.isConnected && state.type === "wifi");
    });

    return () => {
      unsubscribe();
    };
  }, []);



  useEffect(() => {
   

    //Device model Identifier
    const modelIdString = Device.modelId;

    if (modelIDNumber === null) return;

    //Figure out if device is iPhone or iPad
    function getDeviceName(str) {
      if (typeof str !== "string") return;
      if (str.includes("iPad")) {
        return "iPad";
      } else if (str.includes("iPhone")) {
        return "iPhone";
      }
      return null;
    }

    //Extract the number from the model ID string
    function extractNumberFromDeviceString(str) {
      if (typeof str !== "string") return;
      const regex = /(iPhone|iPad)(\d+),/;
      const match = str.match(regex);
      if (match && match[2]) {
        return parseInt(match[2]);
      }
      return null;
    }

    //Check if update is available
    const checkIfUpdateIsAvail = (maxOs) => {
      if (Device.osVersion.toString() === maxOs) {
        setIsUpdateAvailable(false);
      } else {
        setIsUpdateAvailable(true);
      }
    };

    //Get the device type [iPhone ir iPad] and get the model id Number
    const deviceType = getDeviceName(modelIdString);
    const modelIDNumber = extractNumberFromDeviceString(modelIdString);

    //FOR iPhones Devices
    if (deviceType === "iPhone") {
      if (modelIDNumber >= 10) {
        // console.log("This device supports iOS16.3");
        setMaxOsUpdate("16.3");
        checkIfUpdateIsAvail("16.3");
      } else if (modelIDNumber < 10 && modelIDNumber >= 8) {
        // console.log("This device only supports iOS15.6");
        setMaxOsUpdate("15.6");
        checkIfUpdateIsAvail("15.6");
      } else if (modelIDNumber < 8 && modelIDNumber >= 6) {
        // console.log("This device only supports iOS 12.5.5");
        setMaxOsUpdate("12.5.5");
        checkIfUpdateIsAvail("12.5.5");
      } else {
        // console.log(
        //   "Your device does not support recent iOS consider updating to a news models to get all the benefits of the new iOS 16"
        // );
      }
      // FOR iPad Devices
    } else if (deviceType === "iPad") {
      if (modelIDNumber >= 6) {
        // console.log("This device supports iOS16.3");
        setMaxOsUpdate("16.3");
        checkIfUpdateIsAvail("16.3");
      } else if (modelIDNumber === 5) {
        // console.log("This device only supports iOS15.6");
        setMaxOsUpdate("15.6");
        checkIfUpdateIsAvail("15.6");
      } else if (modelIDNumber === 4) {
        // console.log("This device only supports iOS 12.5.5");
        setMaxOsUpdate("12.5.5");
        checkIfUpdateIsAvail("12.5.5");
      } else {
        // console.log(
        //   "Your device does not support recent iOS consider updating to a news models to get all the benefits of the new iOS 16"
        // );
      }
    }

 
  }, []);

  //=========================================================

  //=========================================================
  //CHARGING STATUS
  //=========================================================
  useEffect(() => {
    const subscription = Battery.addBatteryStateListener((event) => {
      if (event.batteryState === 2) {
        setIsDeviceCharging(true);
      } else {
        setIsDeviceCharging(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const flatListRef = useRef(null);

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text style={styles.title}>Update Assistant</Text>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            ref={flatListRef}
            decelerationRate={0.9}
            data={data}
            snapToInterval={dimensions.screen.width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
            renderItem={({ item }) => {
              switch (item.id) {
                case 1:
                  return <Initial />;
                case 2:
                  return (
                    <DeviceInfo
                      isWIFIConnected={isWIFIConnected}
                      isUpdateAvailable={isUpdateAvailable}
                      maxOsUpdate={maxOsUpdate}
                    />
                  );
                case 3:
                  return (
                    <Storageinfo
                      setHasEnoughStorageCheck={setHasEnoughStorageCheck}
                      activeCardId={activeCardId}
                    />
                  );
                case 4:
                  return <BackupInfo setHasBackupCheck={setHasBackupCheck} />;
                case 5:
                  return <ChargingInfo isDeviceCharging={isDeviceCharging} />;
                case 6:
                  return (
                    <FinalInfo
                      isUpdateAvailable={isUpdateAvailable}
                      isWIFIConnected={isWIFIConnected}
                      hasBackupCheck={hasBackupCheck}
                      hasEnoughStorageCheck={hasEnoughStorageCheck}
                      isDeviceCharging={isDeviceCharging}
                    />
                  );
              }
            }}
          />
        </View>
      </ScrollView>
      <Pagination content={data} activeCardId={activeCardId} />
    </View>
  );
};

export default PrepareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: Platform.isPad ? 42 :28,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
    Height: height / 4,
  },
});
