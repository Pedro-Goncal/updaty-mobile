import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

import * as SecureStore from "expo-secure-store";

const BackupInfo = ({ setHasBackupCheck }) => {
  const [hasBackup, setHasBackup] = useState(false);
  const [lastBackupDate, setLastBackupDate] = useState("No Backup");
  const [hasBackedupLast6Month, sethasBackedupLast6Month] = useState(false);

  useEffect(() => {
    if (lastBackupDate !== "No Backup") {
      setHasBackup(true);
    }
  }, [lastBackupDate]);

  async function storeDate(date) {
    //! For testing only------------------------------
    // try {
    //   await SecureStore.deleteItemAsync("lastBackup");
    //   setLastBackupDate("No backup");
    //   setHasBackup(false);
    // } catch (error) {
    //   console.log(error);
    // }
    //!-----------------------------------------------
    try {
      await SecureStore.setItemAsync("lastBackup", date.toString());
      console.log("Date stored successfully");
      const newDate = new Date(date);
      const formattedDate = newDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setLastBackupDate(formattedDate);
    } catch (error) {
      console.log("Error storing date:", error);
    }
  }

  useEffect(() => {
    async function retrieveDate() {
      try {
        const dateStr = await SecureStore.getItemAsync("lastBackup");
        if (dateStr === null) return;

        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (date.getTime() < sixMonthsAgo.getTime()) {
          // stored date is older than 6 months ago
          setHasBackup(true);
          setLastBackupDate(formattedDate);
          sethasBackedupLast6Month(true);
          console.log(
            `Stored date ${formattedDate} is older than 6 months ago.`
          );
        } else {
          // stored date is newer than or equal to 6 months ago
          setHasBackup(true);
          setLastBackupDate(formattedDate);
          sethasBackedupLast6Month(false);
          console.log(
            `Stored date ${formattedDate} is newer than or equal to 6 months ago.`
          );
        }
      } catch (error) {
        console.log("Error retrieving date:", error);
      }
    }
    retrieveDate();
  }, []);

  //TODO - reply on the figma saying we can't check for the actual backup it's blocked by apple now
  //TODO - Sugestion, have a simple explanation on how to do it, and then ask user to come back and click ok when he has done the back up
  //TODO - that will store the date in the app's storage and then show green, next time user comes back it will show the last time he backed up.
  //TODO - Even after user click the button, replace the button with I have done another backup to update the date
  //TODO - Also set up the setHasBackupCheck to true if it has backup

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Step 3 of 5</Text>
        <Text style={styles.title}>Did you backup your data?</Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Row 1*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Last backup</Text>
          <Text style={styles.rightText}>{lastBackupDate}</Text>
        </View>
        {/* Row 2 */}
        {/* <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Backup location </Text>
          <Text style={styles.rightText}>iCloud</Text>
        </View> */}
        {/* Row 2 */}
        <TouchableOpacity
          onPress={() => storeDate(new Date())}
          style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}
        >
          <Text style={styles.leftText}>Click here to confirm backup </Text>
          {/* <Text style={styles.rightText}>NO</Text> */}
        </TouchableOpacity>
        <View style={styles.msgsContainer}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: hasBackup
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(255,170,34,.1)",
                marginBottom: 6,
                marginTop: 6,
              },
            ]}
          >
            <Image
              source={
                hasBackup
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkYellow.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {hasBackup
                ? "You've recently made a backup"
                : "You should create a backup!"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BackupInfo;

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
