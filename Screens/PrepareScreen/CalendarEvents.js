import * as Calendar from "expo-calendar";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const endingDate = 2; //CHANGE RANGE
const startingData = 10;

const TWO_YEARS_AGO = new Date(
  Date.now() - endingDate * 365 * 24 * 60 * 60 * 1000
); // 2 years ago
const TEN_YEARS_AGO = new Date(
  Date.now() - startingData * 365 * 24 * 60 * 60 * 1000
); // 2 years ago

export default function CalendarEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      await askCalendarPermission();

      const calendars = await Calendar.getCalendarsAsync();
      const eventList = [];

      for (const calendar of calendars) {
        const eventsInCalendar = await Calendar.getEventsAsync(
          [calendar.id],
          TEN_YEARS_AGO,
          TWO_YEARS_AGO
        );
        eventList.push(...eventsInCalendar);
      }

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

  async function askCalendarPermission() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      console.warn("Calendar permission not granted");
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => deleteEvent(item.id)}
      style={{ padding: 5, margin: 5, borderWidth: 1 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <Text>{formatDate(item.endDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 5, marginTop: 80 }}>
      <TouchableOpacity onPress={deleteAllEvents}>
        <Text>Delete All</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
