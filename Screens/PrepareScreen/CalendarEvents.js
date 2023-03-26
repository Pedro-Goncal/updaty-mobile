import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";

import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');

import * as Calendar from "expo-calendar";

//Navigation
import { useNavigation } from "@react-navigation/native";




const today = new Date(); // current date
const endingDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
const startingDate = new Date(endingDate.getFullYear() - 4, endingDate.getMonth(), endingDate.getDate());


//It can only retrieve 4 years at the same time, not sure why but with that we can get entries older then 1 year and up to 5 years 


export default function CalendarEvents() {
  const [events, setEvents] = useState([]);

  const navigation = useNavigation();

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
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status !== "granted") {
      console.warn("Calendar permission not granted");
    }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT,{
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      const eventList = [];

        await Calendar.getEventsAsync(
          [calendars[0].id],
          startingDate,
          endingDate
          )
          .then((e)=> {
          
            eventList.push(...e)
          })
          .catch((error)=>console.log("error", error));

      setEvents(eventList);
    })();
  }, []);

  async function deleteEvent(eventId) {
    await Calendar.deleteEventAsync(eventId);
    setEvents(events.filter((event) => event.id !== eventId));
  }

  async function deleteAllEvents() {
    for (const event of events) {
      await Calendar.deleteEventAsync(event.id);
    }
    setEvents([]);
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.row, { borderTopColor: "rgba(144,128,144,0.2)" }]}>
        <View style={styles.textContainer}>

        <Text style={[styles.leftText, {fontSize: Platform.isPad ? 26 : 15}]}>{item.title}</Text>
        <Text style={[styles.rightText, {fontSize: Platform.isPad ? 26 : 15}]}>{formatDate(item.endDate)}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEvent(item.id)}
          >
          <Text style={[styles.buttonText, {fontSize: Platform.isPad ? 26 : 15}]}>Delete</Text>
        </TouchableOpacity>
      </View>
          )

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => navigation.goBack()}
      >
        <ArrowSvg />

        <Text style={[styles.title, {fontSize: Platform.isPad ? 36 : 18}]}>Delete old calendar entries</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={deleteAllEvents}
        style={styles.deleteAllContainer}
      >
        <Text style={{ color: "white", fontSize: Platform.isPad? 26 : 16 }}>Delete All</Text>
      </TouchableOpacity>

      <View style={[styles.cardContainer, {height: dimensions.screen.height -320}]}>
        {events.length < 1 ? (
          <View style={styles.noEntriesContainer}>
            <Text
              style={{
                textAlign: "center",
                paddingHorizontal: 30,
                fontSize: 20,
              }}
            >
              🎉 It looks like you do not have any old entries. Good job in
              keeping your calendar tidy.
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f3",
    paddingTop: 40,
    height: height,
  },

  deleteButton: {
    backgroundColor: "#d72c16",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
   
  },
  buttonText:{
    color: "#FFF"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  row: {
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  leftText: {
    fontSize: 14,
  },
  textContainer:{

  },
  rightText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  
  // cardContainer: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingTop: 10,
  //   paddingBottom: 50,
  // },

  cardContainer: {
    borderRadius: 12,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    marginTop: 20,
  
    padding: 15,
    marginBottom: width / 3,
  },
  deleteAllContainer: {
    borderRadius: 12,
    width: width - 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#d72c16",
  },
  noEntriesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
