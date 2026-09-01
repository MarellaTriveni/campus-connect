import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function EventScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const events = [
    {
      id: 1,
      title: "Technical Fest",
      date: "September 5, 2026",
      time: "10:00 AM",
      location: "College Auditorium",
      category: "Technical",
      icon: "laptop-outline",
      description:
        "A technical festival with coding, project exhibitions and technical activities.",
    },
    {
      id: 2,
      title: "Coding Contest",
      date: "September 10, 2026",
      time: "11:00 AM",
      location: "Computer Lab",
      category: "Technical",
      icon: "code-slash-outline",
      description:
        "Test your programming skills by participating in the coding contest.",
    },
    {
      id: 3,
      title: "Cultural Event",
      date: "September 15, 2026",
      time: "2:00 PM",
      location: "College Ground",
      category: "Cultural",
      icon: "musical-notes-outline",
      description:
        "Enjoy music, dance and cultural performances by students.",
    },
    {
      id: 4,
      title: "Sports Meet",
      date: "September 20, 2026",
      time: "9:00 AM",
      location: "Sports Ground",
      category: "Sports",
      icon: "football-outline",
      description:
        "Annual sports meet with different games and competitions.",
    },
    {
      id: 5,
      title: "Career Guidance",
      date: "September 25, 2026",
      time: "10:30 AM",
      location: "Seminar Hall",
      category: "Career",
      icon: "briefcase-outline",
      description:
        "Career guidance session to help students understand job opportunities.",
    },
  ];

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Sports",
    "Career",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      event.description
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const showEventDetails = (event) => {
    Alert.alert(
      event.title,
      `📅 Date: ${event.date}\n\n` +
        `⏰ Time: ${event.time}\n\n` +
        `📍 Location: ${event.location}\n\n` +
        `🏷️ Category: ${event.category}\n\n` +
        `${event.description}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            Campus Connect
          </Text>

          <Text style={styles.headerTitle}>
            Events 📅
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="calendar"
            size={27}
            color="#6C63FF"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <Text style={styles.categoryTitle}>
          Event Categories
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                setSelectedCategory(category)
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Result */}
        <View style={styles.resultRow}>
          <Text style={styles.sectionTitle}>
            Upcoming Events
          </Text>

          <Text style={styles.resultCount}>
            {filteredEvents.length} found
          </Text>
        </View>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              activeOpacity={0.8}
              onPress={() =>
                showEventDetails(event)
              }
            >

              {/* Event Icon */}
              <View style={styles.iconBox}>
                <Ionicons
                  name={event.icon}
                  size={28}
                  color="#6C63FF"
                />
              </View>

              {/* Event Content */}
              <View style={styles.eventContent}>

                <View style={styles.titleRow}>
                  <Text style={styles.eventTitle}>
                    {event.title}
                  </Text>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {event.category}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color="#777"
                  />

                  <Text style={styles.infoText}>
                    {event.date}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color="#777"
                  />

                  <Text style={styles.infoText}>
                    {event.location}
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />

            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Ionicons
              name="calendar-outline"
              size={50}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No Events Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        )}

        {/* Information */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={23}
            color="#6C63FF"
          />

          <Text style={styles.infoBoxText}>
            Tap an event to view complete details.
          </Text>
        </View>

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
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallTitle: {
    color: "#E5E3FF",
    fontSize: 13,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  searchBox: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 3,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  categoryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  categoryScroll: {
    marginBottom: 20,
  },

  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  resultRow: {
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

  resultCount: {
    fontSize: 12,
    color: "#777",
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  eventContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  eventTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  badge: {
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 5,
  },

  badgeText: {
    color: "#6C63FF",
    fontSize: 9,
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  infoText: {
    fontSize: 11,
    color: "#888",
    marginLeft: 5,
  },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 35,
    alignItems: "center",
    marginTop: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },

  infoBox: {
    backgroundColor: "#EEEDFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  infoBoxText: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginLeft: 9,
  },
});