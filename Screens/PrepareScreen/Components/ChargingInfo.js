import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Platform, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');
import { Bar } from "react-native-progress";

import * as Battery from "expo-battery";

const ChargingInfo = ({ isDeviceCharging }) => {
  const [deviceCurrentBattery, setDeviceCurrentBattery] = useState(100);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(null);

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


  //========================================================
  //BATTERY LEVEL AND CAHRGING - V
  //========================================================

  useEffect(() => {
    const getBatteryStatus = async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();

      setDeviceCurrentBattery(batteryLevel);

      const batteryCapacity = 3000; // Replace with your device's battery capacity in mAh
      const batteryRemaining = batteryLevel * batteryCapacity;
      let estimatedTimeRemaining = batteryRemaining / 300;

      setEstimatedTimeRemaining(estimatedTimeRemaining);
    };
    getBatteryStatus();
  }, []);

  //TODO - Check to see when the device has more battey if the estimated remaining time is accurrate

  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: Platform.isPad ? dimensions.screen.height - 370 : dimensions.screen.height - 300}]}>
      <ScrollView style={{flex:1}}>

      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Step 4 of 5</Text>
        <Text style={styles.title}>Is your device charging?</Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Row 1*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Battery charge</Text>
          <Text style={styles.rightText}>
            {Math.round(deviceCurrentBattery * 100)}%
          </Text>
        </View>
        {/* Row 2 */}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Charging state</Text>
          <Text style={styles.rightText}>
            {isDeviceCharging ? "charging" : "unplugged"}
          </Text>
        </View>
        {/* Row 3 */}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Estimated run time</Text>
          <Text style={styles.rightText}>
            {isDeviceCharging
              ? "∞"
              : `${Math.round(estimatedTimeRemaining)} hours`}
          </Text>
        </View>
        {/* Row 4 */}
        {/* Row Prograss bar*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Bar
            progress={deviceCurrentBattery}
            animated
            width={width - 65}
            unfilledColor={"#ecf0f3"}
            borderColor={"#ecf0f3"}
            color={
              isDeviceCharging ? "rgba(102,204,102,1)" : "rgba(187,17,51,1)"
            }
          />
        </View>
        <View style={styles.msgsContainer}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: isDeviceCharging
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(187,17,51,.1)",
              },
            ]}
          >
            <Image
              source={
                isDeviceCharging
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkRed.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {isDeviceCharging ? "Charger connected" : "Connect your charger!"}
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>

    </View>
  );
};

export default ChargingInfo;

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
    fontSize: 14,
    paddingBottom: 6,
    fontFamily: 'inter-regular',
  },
  title: {
    fontSize: 22,
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
    fontSize: 16,
    fontFamily: 'inter-regular',
  },
  rightText: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    width: "94%",
    fontFamily: 'inter-bold',
  },
});
