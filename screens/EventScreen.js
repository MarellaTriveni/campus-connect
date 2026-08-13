import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EventScreen() {
  const [search, setSearch] = useState("");

  const events = [
    {
      title: "Technical Fest",
      category: "College Event",
      date: "15",
      month: "AUG",
      time: "10:00 AM",
      venue: "College Auditorium",
      icon: "school-outline",
    },
    {
      title: "Coding Contest",
      category: "Competition",
      date: "20",
      month: "AUG",
      time: "11:00 AM",
      venue: "Computer Lab",
      icon: "code-slash-outline",
    },
    {
      title: "React Native Workshop",
      category: "Workshop",
      date: "25",
      month: "AUG",
      time: "2:00 PM",
      venue: "Seminar Hall",
      icon: "phone-portrait-outline",
    },
    {
      title: "Hackathon 2026",
      category: "Hackathon",
      date: "30",
      month: "AUG",
      time: "9:00 AM",
      venue: "Innovation Center",
      icon: "trophy-outline",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>Campus Activities</Text>
          <Text style={styles.title}>Events 📅</Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons
            name="calendar-outline"
            size={25}
            color="#4B3F72"
          />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Upcoming Events
        </Text>

        <Text style={styles.countText}>
          {filteredEvents.length} Events
        </Text>
      </View>

      {/* Event List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventCard}
              activeOpacity={0.8}
            >

              {/* Date */}
              <View style={styles.dateBox}>
                <Text style={styles.dateNumber}>
                  {event.date}
                </Text>

                <Text style={styles.dateMonth}>
                  {event.month}
                </Text>
              </View>

              {/* Event Content */}
              <View style={styles.eventContent}>

                <View style={styles.titleRow}>
                  <Text
                    style={styles.eventTitle}
                    numberOfLines={2}
                  >
                    {event.title}
                  </Text>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {event.category}
                    </Text>
                  </View>
                </View>

                {/* Time */}
                <View style={styles.infoRow}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color="#777"
                  />

                  <Text style={styles.infoText}>
                    {event.time}
                  </Text>
                </View>

                {/* Venue */}
                <View style={styles.infoRow}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#777"
                  />

                  <Text style={styles.infoText}>
                    {event.venue}
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#999"
              />

            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="calendar-outline"
              size={50}
              color="#AAA"
            />

            <Text style={styles.emptyTitle}>
              No events found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for another event.
            </Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallTitle: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 3,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 22,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  countText: {
    fontSize: 13,
    color: "#6C5B9B",
    fontWeight: "600",
  },

  list: {
    paddingBottom: 30,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  dateBox: {
    width: 58,
    height: 65,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  dateNumber: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#4B3F72",
  },

  dateMonth: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#6C5B9B",
    marginTop: 2,
  },

  eventContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  eventTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },

  badge: {
    backgroundColor: "#EEEAF8",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 9,
    color: "#6C5B9B",
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  infoText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 6,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },
});