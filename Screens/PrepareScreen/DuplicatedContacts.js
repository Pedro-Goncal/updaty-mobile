import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";

function App() {
  const [duplicatedContacts, setDuplicatedContacts] = useState([]);

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
      console.log("Error deleting contact: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteContact(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={duplicatedContacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>No duplicated contacts found</Text>}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contactName: {
    flex: 1,
    fontWeight: "bold",
  },
  contactPhone: {
    flex: 2,
  },
});

export default App;
