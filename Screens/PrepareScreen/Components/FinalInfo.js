import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const FinalInfo = ({
  isUpdateAvailable,
  isWIFIConnected,
  hasBackupCheck,
  hasEnoughStorageCheck,
  isDeviceCharging,
}) => {
  const [isReadyForUpdate, setIsReadyForUpdate] = useState(false);

  useEffect(() => {
    if (
      isUpdateAvailable &&
      isWIFIConnected &&
      hasBackupCheck &&
      hasEnoughStorageCheck &&
      isDeviceCharging
    ) {
      setIsReadyForUpdate(true);
    } else {
      setIsReadyForUpdate(false);
    }
  }, [
    isUpdateAvailable,
    isWIFIConnected,
    hasBackupCheck,
    hasEnoughStorageCheck,
    isDeviceCharging,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Step 5 of 5</Text>
        <Text style={styles.title}>
          {isReadyForUpdate
            ? "🎉 Congratulations! You're all set to update your device."
            : "🙈 Oh no! Looks like there are still issues you need to fix"}
        </Text>
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
            <Image
              source={
                isUpdateAvailable
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkYellow.png")
              }
              style={{ width: 20, height: 20 }}
            />
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
            <Image
              source={
                isWIFIConnected
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkRed.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {isWIFIConnected ? "Wi-Fi connected" : "Please connect to Wi-Fi"}
            </Text>
          </View>
          {/* Wi-Fi Message */}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: hasBackupCheck
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(255,170,34,.1)",
                marginBottom: 6,
                marginTop: 6,
              },
            ]}
          >
            <Image
              source={
                hasBackupCheck
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkYellow.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {hasBackupCheck
                ? "You've recently made a backup"
                : "You should create a backup!"}
            </Text>
          </View>
          {/* Update message */}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: hasEnoughStorageCheck
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(255,170,34,.1)",
                marginBottom: 6,
                marginTop: 6,
              },
            ]}
          >
            <Image
              source={
                hasEnoughStorageCheck
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkRed.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {hasEnoughStorageCheck
                ? "Sufficient space available"
                : "Not enough space! You should delete apps, videos and photos that you no longer need."}
            </Text>
          </View>
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
    </View>
  );
};

export default FinalInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    // minHeight: height,
    padding: 20,
    // justifyContent: "space-between",

    //  shadowColor: "#000",
    //  shadowOffset: {
    //    width: 0,
    //    height: 4,
    //  },
    //  shadowOpacity: 0.3,
    //  shadowRadius: 4.65,

    //  elevation: 8,
  },
  titleContainer: {
    paddingBottom: 20,
  },
  subTitle: {
    color: "#607080",
    fontSize: 14,
    paddingBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
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
  },
  rightText: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
    width: "94%",
  },
});
