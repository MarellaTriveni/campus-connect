import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyRegistrationsScreen = ({ navigation }) => {
  const [registrations, setRegistrations] = useState([
    {
      id: "1",
      title: "React Native Workshop",
      category: "Workshop",
      date: "10 September 2026",
      time: "10:00 AM",
      venue: "Seminar Hall",
    },
    {
      id: "2",
      title: "Coding Contest",
      category: "Technical",
      date: "15 September 2026",
      time: "11:00 AM",
      venue: "Computer Lab",
    },
  ]);

  const cancelRegistration = (id, title) => {
    Alert.alert(
      "Cancel Registration",
      `Do you want to cancel registration for ${title}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setRegistrations(
              registrations.filter((item) => item.id !== id)
            );

            Alert.alert(
              "Cancelled",
              "Registration cancelled successfully."
            );
          },
        },
      ]
    );
  };

  const renderRegistration = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons
          name="calendar"
          size={28}
          color="#6C63FF"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#555"
          />
          <Text style={styles.info}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#555"
          />
          <Text style={styles.info}>
            {item.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#555"
          />
          <Text style={styles.info}>
            {item.venue}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            cancelRegistration(item.id, item.title)
          }
        >
          <Ionicons
            name="close-circle-outline"
            size={18}
            color="white"
          />

          <Text style={styles.cancelText}>
            Cancel Registration
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Registrations
        </Text>

        <View style={styles.countBox}>
          <Text style={styles.countText}>
            {registrations.length}
          </Text>
        </View>
      </View>

      {/* Registration List */}
      <FlatList
        data={registrations}
        keyExtractor={(item) => item.id}
        renderItem={renderRegistration}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="calendar-outline"
              size={70}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No Registrations
            </Text>

            <Text style={styles.emptyText}>
              You have not registered for any events yet.
            </Text>

            <TouchableOpacity
              style={styles.eventButton}
              onPress={() =>
                navigation.navigate("Event")
              }
            >
              <Text style={styles.eventButtonText}>
                Browse Events
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default MyRegistrationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    height: 65,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  countBox: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },

  list: {
    padding: 15,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 3,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    color: "#6C63FF",
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  info: {
    marginLeft: 7,
    color: "#555",
    fontSize: 13,
  },

  cancelButton: {
    backgroundColor: "#E74C3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 8,
    marginTop: 10,
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 8,
  },

  eventButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  eventButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});