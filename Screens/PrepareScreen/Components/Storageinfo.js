import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView
} from "react-native";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Redux
import { useDispatch } from "react-redux";

//Progress barr
import { Bar } from "react-native-progress";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');
//Device info
import * as FileSystem from "expo-file-system";


// import * as Contacts from "expo-contacts";
// import * as Calendar from "expo-calendar";


//SVG
import ArrowUp from "../../../assets/iconsSvg/ArrowUp";
import ArrowDown from "../../../assets/iconsSvg/ArrowDown";
import ArrowRight from "../../../assets/iconsSvg/ArrowRight";
import { handleClick } from "../../../Redux/slices/adSlice";

//TODO - Figure out how to get the usage space for each folder
//TODO - Should i have the second warning if there is enough space?

const Storageinfo = ({ setHasEnoughStorageCheck, activeCardId }) => {
  const [deviceTotalDiskSpace, setDeviceTotalDiskSpace] = useState("");
  const [deviceFreeDiskSpace, setDeviceFreeDiskSpace] = useState("");
  const [hasEnoughStorage, setHasEnoughStorage] = useState(false);
  const [isUsageDetailsOpen, setIsUsageDetailsOpen] = useState(false);
  const [isCleanUpOptionsOpen, setIsCleanUpOptionsOpen] = useState(false);
  const [progressBarStorage, setProgressBarStorage] = useState(1);

  const navigation = useNavigation();
  const dispatch = useDispatch()

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
  //GET DEVICE INFO
  //========================================================

  const [photosSize, setPhotosSize] = useState(0);
  const [documentsSize, setDocumentsSize] = useState(0);
  const [videosSize, setVideosSize] = useState(0);

  useEffect(() => {
    const getStorageInfo = async () => {
      const totalFreeDiskCapacity = await FileSystem.getFreeDiskStorageAsync();
      const totalDiskCapacity = await FileSystem.getTotalDiskCapacityAsync();

      //TOTAL FREE SPACE
      setDeviceFreeDiskSpace(
        (totalFreeDiskCapacity / 1024 / 1024 / 1024).toFixed(2)
      );

      setDeviceTotalDiskSpace(
        (totalDiskCapacity / 1024 / 1024 / 1024).toFixed(2)
      );
      setProgressBarStorage(
        (totalFreeDiskCapacity / 1024 / 1024 / 1024).toFixed(2) /
        (totalDiskCapacity / 1024 / 1024 / 1024).toFixed(2)
      );
    };

    getStorageInfo();

    if (deviceFreeDiskSpace > 5) {
      setHasEnoughStorage(true);
      setHasEnoughStorageCheck(true);
    }

   
  }, [deviceFreeDiskSpace]);


  // useEffect(()=> {
  //   async function getMediaLibrarySize() {
  //     try {
  //       const { status } = await MediaLibrary.requestPermissionsAsync();
  //       // console.log('status ===', status);


  //       if (status === "granted") {

  //         // const {assets} = await MediaLibrary.getAssetsAsync()

         

  //         // console.log("======================> ", Image.getSize(assets[0].uri))
  //         // const asset = await MediaLibrary.getAssetInfoAsync(assets[0].uri);
  //         // console.log(asset)


      
        

  //         // const photoDetail = await MediaLibrary.getAssetInfoAsync(
  //         //   assets[0].id
  //         // );
  //         // console.log('photoDetail ===', photoDetail);


  //         // MediaLibrary.getAssetsAsync({
  //         //   mediaType: MediaLibrary.MediaType.photo,
  //         // }).then(assets => {
            
  //         //   try {
  //         //     assets.assets.forEach(async asset => {
               
  //         //       const size = await Image.getSize(asset.uri);
  //         //       const compressionRate = asset.fileSize / (size.width * size.height);
  //         //       console.log(`Compression rate of ${asset.filename}: ${compressionRate}`);
  //         //     });
  //         //   } catch (error) {
  //         //     console.log(error)
  //         //   }
       
  //         // });


  //         function calculatePhotoSizeInBytes(width, height, dpi, bitDepth, compressionRatio) {
  //           const bitsPerPixel = bitDepth * 3; // Assuming 3 color channels (RGB)
  //           const bytesPerPixel = bitsPerPixel / 8;
  //           const compressionFactor = 1 / compressionRatio;
  //           const widthInches = width / dpi;
  //           const heightInches = height / dpi;
  //           const totalPixels = width * height;
  //           const totalBytes = totalPixels * bytesPerPixel * compressionFactor;
  //           return totalBytes;
  //         }


  //         // console.log("This is a calculated size",calculatePhotoSizeInBytes(photoDetail.exif.PixelWidth, photoDetail.exif.PixelHeight, photoDetail.exif.DPIHeight, photoDetail.exif.Depth, 2) / 1024 / 1024)


  //       } else {
  //         await MediaLibrary.requestPermissionsAsync();
  //       }
  //     } catch (error) {
  //       console.log("Error getting media library size:", error);
  //     }
  //   }

  //   getMediaLibrarySize();
  // },[])

  //======================================
  //Get amount of duplicated contacts
  //=====================================
  // const [duplicatedContacts, setDuplicatedContacts] = useState([]);

  // const getContacts = async () => {
  //   const { status } = await Contacts.requestPermissionsAsync();
  //   if (status === "granted") {
  //     const { data } = await Contacts.getContactsAsync({
  //       fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
  //     });

  //     const contactsMap = new Map();
  //     data.forEach((contact) => {
  //       if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
  //         const phoneNumber = contact.phoneNumbers[0].number.replace(/\D/g, "");
  //         if (phoneNumber.length > 0) {
  //           const existingContact = contactsMap.get(phoneNumber);
  //           if (existingContact) {
  //             contactsMap.set(phoneNumber, [...existingContact, contact]);
  //           } else {
  //             contactsMap.set(phoneNumber, [contact]);
  //           }
  //         }
  //       }
  //     });

  //     const duplicates = [];
  //     contactsMap.forEach((contactList) => {
  //       if (contactList.length > 1) {
  //         duplicates.push(...contactList);
  //       }
  //     });

  //     setDuplicatedContacts(duplicates);
  //   } else {
  //     Alert.alert(
  //       "Contacts permission not granted",
  //       "Please grant contacts permission to use this feature"
  //     );
  //   }
  // };



  // useEffect(() => {
  //   if(activeCardId === 3 ){
  //     getContacts();

  //   }
  // }, [activeCardId ]);

  //======================================
  //Get amount of old calendar entries
  //=====================================
//   const [events, setEvents] = useState([]);
 
//   const today = new Date(); // current date
//  const endingDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
// const startingDate = new Date(endingDate.getFullYear() - 4, endingDate.getMonth(), endingDate.getDate());



//     const getCalendarEvents = async () => {
//       const { status } = await Calendar.requestCalendarPermissionsAsync();

//       if (status !== "granted") {
//         console.warn("Calendar permission not granted");
//       }

//       const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT,{
//         accessLevel: Calendar.CalendarAccessLevel.OWNER,
//       });
//       const eventList = [];

//         await Calendar.getEventsAsync(
//           [calendars[0].id],
//           startingDate,
//           endingDate
//           )
//           .then((e)=> {
          
//             eventList.push(...e)
//           })
//           .catch((error)=>console.log("error", error));

//       setEvents(eventList);

//     }
   
//     useEffect(() => {
//       if(activeCardId === 3){
//     getCalendarEvents()
//       }
//   }, [activeCardId]);

  //Call calander and contacts again to update UI
  // useEffect(() => {
  //   if(activeCardId === 3){
      
  //     const unsubscribe = navigation.addListener("focus", () => {
  //       getCalendarEvents();
  //       getContacts();
  //     });
      
  //     return unsubscribe;
  //   }
  //   }, [navigation]);

  return (
    <View style={[styles.container, {width: dimensions.screen.width - 20, height: Platform.isPad ? dimensions.screen.height - 370 : dimensions.screen.height - 300}]}>
      <ScrollView>

      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Step 2 of 5</Text>
        <Text style={styles.title}>Let's see if you have enough space...</Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Row Prograss bar*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Bar
            // progress={deviceFreeDiskSpace / deviceTotalDiskSpace}
            progress={progressBarStorage}
            animated
            useNativeDriver={true}
            height={8}
            width={width - 65}
            unfilledColor={"#ecf0f3"}
            borderColor={"#ecf0f3"}
            color={
              hasEnoughStorage ? "rgba(102,204,102,1)" : "rgba(187,17,51,1)"
            }
          />
        </View>
        {/* Row 1*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Storage capacity</Text>
          <Text style={styles.rightText}>{deviceTotalDiskSpace} GB</Text>
        </View>
        {/* Row 2*/}
        <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
          <Text style={styles.leftText}>Storage available</Text>
          <Text style={styles.rightText}>{deviceFreeDiskSpace} GB</Text>
        </View>
        {/* Row 3*/}
        {/* <TouchableOpacity
          onPress={() =>
            setIsUsageDetailsOpen((isUsageDetailsOpen) => !isUsageDetailsOpen)
          }
          style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}
        >
          <Text style={styles.leftText}>Usage details</Text>
          <View style={styles.rightText}>
            {isUsageDetailsOpen ? <ArrowUp /> : <ArrowDown />}
          </View>
        </TouchableOpacity> */}
        {/* Usage details dropdown */}
        {/* {isUsageDetailsOpen && (
          <View style={styles.dropDownContainer}>
 
            <View
              style={[
                styles.rowGray,
                {
                  borderBottomColor: "rgba(144,128,144,0.2)",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text style={styles.leftText}>Photos</Text>
              <Text style={styles.rightText}>{photosSize}</Text>
            </View>
        
            <View
              style={[
                styles.rowGray,
                {
                  borderBottomColor: "rgba(144,128,144,0.2)",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text style={styles.leftText}>Videos</Text>
              <Text style={styles.rightText}>{videosSize}</Text>
            </View>

        
            <View
              style={[
                styles.rowGray,
                { borderTopColor: "rgba(144,128,144,0.2)" },
              ]}
            >
              <Text style={styles.leftText}>Documents</Text>
              <Text style={styles.rightText}>{documentsSize}</Text>
            </View>
          </View>
        )} */}
        {/* Row 4*/}
        {/* <TouchableOpacity
          onPress={() =>
            setIsCleanUpOptionsOpen(
              (isCleanUpOptionsOpen) => !isCleanUpOptionsOpen
            )
          }
          style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}
        >
          <Text style={styles.leftText}>Clean up options</Text>
          <View style={styles.rightText}>
            {isCleanUpOptionsOpen ? <ArrowUp /> : <ArrowDown />}
          </View>
        </TouchableOpacity> */}
        {/* Clean up options dropdown */}
        {/* {isCleanUpOptionsOpen && (
          <View style={styles.dropDownContainer}>
            <TouchableOpacity
              onPress={() => {
                if (events.length < 1) return;
                dispatch(handleClick())
                navigation.navigate("CalendarEvents");
              }}
              style={[
                styles.rowGray,
                {
                  borderBottomColor: "rgba(144,128,144,0.2)",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text style={styles.leftText}>Old calendar entries</Text>
              <View style={styles.rightText}>
                <Text style={{ fontSize: Platform.isPad ? 22 :16, fontWeight: "bold" }}>
                  {events.length}
                </Text>
                <ArrowRight />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rowGray]}
              onPress={() => {
                if (duplicatedContacts.length < 1) return;
                dispatch(handleClick())
                navigation.navigate("DuplicatedContacts");
              }}
            >
              <Text style={styles.leftText}>Duplicate contacts</Text>
              <View style={styles.rightText}>
                <Text style={{ fontSize: Platform.isPad ? 22 :16, fontWeight: "bold" }}>
                  {duplicatedContacts.length}
                </Text>
                <ArrowRight />
              </View>
            </TouchableOpacity>
          </View>
        )} */}

        {/* Messages  */}
        <View style={styles.msgsContainer}>
          {/* Storage message */}
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: hasEnoughStorage
                  ? "rgba(102, 204, 102, .1)"
                  : "rgba(187,17,51,.1)",
                marginBottom: 6,
                marginTop: 6,
              },
            ]}
          >
            <Image
              source={
                hasEnoughStorage
                  ? require("../../../assets/iconsSvg/checkGreen.png")
                  : require("../../../assets/iconsSvg/checkRed.png")
              }
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.msgText}>
              {hasEnoughStorage
                ? "Sufficient space available"
                : "Not enough space! You should delete apps, videos and photos that you no longer need."}
            </Text>
          </View>

          {/* Clean up message Message */}
          {!hasEnoughStorage && (
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: "rgba(255,170,34,.1)",
                },
              ]}
            >
              <Image
                source={require("../../../assets/iconsSvg/checkYellow.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={styles.msgText}>
                You should clean up you device!
              </Text>
            </View>
          )}
        </View>
      </View>
      </ScrollView>

    </View>
  );
};

export default Storageinfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    // minHeight: height,
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
    flexDirection: "row",
    alignItems: "center",
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
  dropDownContainer: {
    backgroundColor: "#ecf0f3",
    borderRadius: 8,
    marginBottom: 16,
  },
  rowGray: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});




        // const covertBytes = (size, type) => {
        //   if (type === "photos") {
        //     if (size < 1024) {
        //       setPhotosSize(`${size} bytes`);
        //     } else if (size > 1024 && size < 1048576) {
        //       setPhotosSize(`${Math.round(size / 1024)} kb`);
        //     } else if (size > 1048576 && size < 1073741824) {
        //       setPhotosSize(`${Math.round(size / 1024 / 1024)} MB`);
        //     } else {
        //       setPhotosSize(`${Math.round(size / 1024 / 1024 / 1024)} GB`);
        //     }
        //   } else if (type === "videos") {
        //     if (size < 1024) {
        //       setVideosSize(`${size} bytes`);
        //     } else if (size > 1024 && size < 1048576) {
        //       setVideosSize(`${Math.round(size / 1024)} kb`);
        //     } else if (size > 1048576 && size < 1073741824) {
        //       setVideosSize(`${Math.round(size / 1024 / 1024)} MB`);
        //     } else {
        //       setVideosSize(`${Math.round(size / 1024 / 1024 / 1024)} GB`);
        //     }
        //   } else if (type === "documents") {
        //     if (size < 1024) {
        //       setDocumentsSize(`${size} bytes`);
        //     } else if (size > 1024 && size < 1048576) {
        //       setDocumentsSize(`${Math.round(size / 1024)} kb`);
        //     } else if (size > 1048576 && size < 1073741824) {
        //       setDocumentsSize(`${Math.round(size / 1024 / 1024)} MB`);
        //     } else {
        //       setDocumentsSize(`${Math.round(size / 1024 / 1024 / 1024)} GB`);
        //     }
        //   }
        // };