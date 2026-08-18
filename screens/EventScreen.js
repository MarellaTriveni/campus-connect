import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const events = [
  {
    id: 1,
    title: "React Native Workshop",
    date: "18 Aug 2026",
    time: "10:00 AM",
    location: "Seminar Hall",
    icon: "phone-portrait-outline",
  },
  {
    id: 2,
    title: "Coding Contest",
    date: "20 Aug 2026",
    time: "2:00 PM",
    location: "Computer Lab",
    icon: "code-slash-outline",
  },
  {
    id: 3,
    title: "Campus Hackathon",
    date: "22 Aug 2026",
    time: "9:00 AM",
    location: "Innovation Center",
    icon: "laptop-outline",
  },
  {
    id: 4,
    title: "Placement Training",
    date: "25 Aug 2026",
    time: "11:00 AM",
    location: "Auditorium",
    icon: "briefcase-outline",
  },
];

export default function EventScreen() {
  const handleRegister = (eventName) => {
    alert(`Registration started for ${eventName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>College Events</Text>
        <Ionicons name="calendar-outline" size={28} color="#fff" />
      </View>

      {/* Event List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <Text style={styles.heading}>Upcoming Events</Text>

        {events.map((event) => (
          <View key={event.id} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons
                name={event.icon}
                size={30}
                color="#6C63FF"
              />
            </View>

            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>

              <View style={styles.row}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color="#666"
                />
                <Text style={styles.details}>{event.date}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color="#666"
                />
                <Text style={styles.details}>{event.time}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#666"
                />
                <Text style={styles.details}>{event.location}</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRegister(event.title)}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  header: {
    backgroundColor: "#6C63FF",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  eventInfo: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  details: {
    marginLeft: 7,
    fontSize: 14,
    color: "#666",
  },

  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});