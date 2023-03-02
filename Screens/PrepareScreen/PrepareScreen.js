import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");

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
  //WI-FI INFO
  const [isWIFIConnected, setIsWIFIConnected] = useState(false);
  //BACK UP INFO
  const [hasBackupCheck, setHasBackupCheck] = useState(false);
  //STORAGE INFO
  const [hasEnoughStorageCheck, setHasEnoughStorageCheck] = useState(false);
  //CHARGING INFO
  const [isDeviceCharging, setIsDeviceCharging] = useState(false);

  //=========================================================
  //Card visibility and seting up pagination
  //Set viewability of each post based on the id of the post
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  });

  const getItemLayout = (data, index) => ({
    length: width - 20,
    offset: width * index,
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

  //TODO - Create use effect to check if there is an update available and update the variable

  //=========================================================

  //=========================================================
  //WI-FI AND OS INFO
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
  //=========================================================

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text style={styles.title}>Update Assistant</Text>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            data={data}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            snapToInterval={width} // Distance between each snap point
            snapToAlignment={"center"} // Align snap point to the center of the view
            renderItem={({ item }) => {
              switch (item.id) {
                case 1:
                  return <Initial />;
                case 2:
                  return (
                    <DeviceInfo
                      isWIFIConnected={isWIFIConnected}
                      isUpdateAvailable={isUpdateAvailable}
                    />
                  );
                case 3:
                  return (
                    <Storageinfo
                      setHasEnoughStorageCheck={setHasEnoughStorageCheck}
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
            keyExtractor={(item) => item.id}
            horizontal
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged.current}
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
    paddingTop: height / 15,
    height: height,
  },
  scrollView: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
  },
});
