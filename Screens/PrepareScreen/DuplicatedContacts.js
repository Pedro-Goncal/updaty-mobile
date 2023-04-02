import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
  Platform,
  ScrollView
} from "react-native";

import ArrowSvg from "../../assets/iconsSvg/ArrowSvg";

const { width, height } = Dimensions.get("window");
const screenDimensions = Dimensions.get('screen');
//Device info
import * as Contacts from "expo-contacts";

//Navigation
import { useNavigation } from "@react-navigation/native";

function App({route}) {
  const [duplicatedContacts, setDuplicatedContacts] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

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
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        const contactsMap = new Map();
        data.forEach((contact) => {
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            const phoneNumber = contact.phoneNumbers[0].number.replace(
              /\D/g,
              ""
            );
            if (phoneNumber.length > 0) {
              const existingContact = contactsMap.get(phoneNumber);
              if (existingContact) {
                contactsMap.set(phoneNumber, [...existingContact, contact]);
              } else {
                contactsMap.set(phoneNumber, [contact]);
              }
            }
          }
        });

        const duplicates = [];
        contactsMap.forEach((contactList) => {
          if (contactList.length > 1) {
            duplicates.push(...contactList);
          }
        });

        setDuplicatedContacts(duplicates);
        setLoading(false);
      } else {
        Alert.alert(
          "Contacts permission not granted",
          "Please grant contacts permission to use this feature"
        );
      }
    };

    getContacts();
  }, []);

  const deleteContact = async (contactId) => {
    try {
      await Contacts.removeContactAsync(contactId);
      setDuplicatedContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactId)
      );
    } catch (error) {
      Alert.alert(
        "Permission",
        "It looks like you do not have permission to delete contacts, please go to your phone app and delete the contacts there."
      );
      console.log("Error deleting contact: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View >
      
      <View style={[styles.row, { borderBottomColor: "rgba(144,128,144,0.2)" }]}>
        <View>
          <Text style={[styles.leftText, {fontSize: Platform.isPad ? 26 : 15}]}>{item.name}</Text>
          <Text style={[styles.rightText, {fontSize: Platform.isPad ? 26 : 15}]}>{item.phoneNumbers[0].number}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteContact(item.id)}
          >
          <Text style={[styles.buttonText, {fontSize: Platform.isPad ? 26 : 15}]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };

  



  return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowSvg />

          <Text style={[styles.title, {fontSize: Platform.isPad ? 36 : 18}]}>Delete duplicate contacts</Text>
        </TouchableOpacity>

       <View style={[styles.cardContainer, {height: dimensions.screen.height -320}]}>
          <View style={[styles.card, {width: dimensions.screen.width - 20, height: Platform.isPad ? dimensions.screen.height - 380 : dimensions.screen.height - 300}]}>
            <FlatList
              data={duplicatedContacts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => <Text style={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>No duplicated contacts found</Text>}
              />
          </View>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 46,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 6,
    fontFamily: "inter-bold",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 7.65,
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    paddingHorizontal: 24,
    paddingVertical:12,
    paddingBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#d72c16",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "inter-bold"
  },
  contactName: {
    flex: 1,
    fontFamily: "inter-regular"
  },
  contactPhone: {
    flex: 2,
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
    fontSize: 16,
    fontFamily: "inter-regular"
  },
  rightText: {
    fontSize: 16,
   fontFamily: "inter-bold"
  },

 
  scrollView: { flex: 1 },



  
  noEntriesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default App;
