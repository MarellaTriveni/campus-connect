import React, { useMemo, useState } from "react";
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

const initialEvents = [
  {
    id: 1,
    title: "React Native Workshop",
    category: "Workshop",
    date: "18 Aug 2026",
    time: "10:00 AM",
    location: "Seminar Hall",
  },
  {
    id: 2,
    title: "Coding Contest",
    category: "Competition",
    date: "20 Aug 2026",
    time: "2:00 PM",
    location: "Computer Lab",
  },
  {
    id: 3,
    title: "Campus Hackathon",
    category: "Hackathon",
    date: "22 Aug 2026",
    time: "9:00 AM",
    location: "Innovation Center",
  },
  {
    id: 4,
    title: "Placement Training",
    category: "Placement",
    date: "25 Aug 2026",
    time: "11:00 AM",
    location: "Auditorium",
  },
  {
    id: 5,
    title: "Technical Seminar",
    category: "Seminar",
    date: "28 Aug 2026",
    time: "10:30 AM",
    location: "Seminar Hall",
  },
];

const categories = [
  "All",
  "Workshop",
  "Competition",
  "Hackathon",
  "Placement",
  "Seminar",
];

export default function EventScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Stores registered event IDs
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const toggleRegistration = (event) => {
    const isRegistered = registeredEvents.includes(event.id);

    if (isRegistered) {
      setRegisteredEvents((current) =>
        current.filter((id) => id !== event.id)
      );

      Alert.alert(
        "Registration Cancelled",
        `You are no longer registered for ${event.title}.`
      );
    } else {
      setRegisteredEvents((current) => [
        ...current,
        event.id,
      ]);

      Alert.alert(
        "Registration Successful",
        `You are registered for ${event.title}.`
      );
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSmall}>
            Campus Connect
          </Text>

          <Text style={styles.headerTitle}>
            Events
          </Text>
        </View>

        <View style={styles.calendarIcon}>
          <Ionicons
            name="calendar-outline"
            size={28}
            color="#6C63FF"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Registration Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color="#6C63FF"
            />
          </View>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>
              My Registrations
            </Text>

            <Text style={styles.summarySubtitle}>
              {registeredEvents.length} event
              {registeredEvents.length !== 1 ? "s" : ""} registered
            </Text>
          </View>

          <Text style={styles.summaryNumber}>
            {registeredEvents.length}
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
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
              onPress={() => setSelectedCategory(category)}
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

        {/* Result Count */}
        <View style={styles.resultRow}>
          <Text style={styles.resultText}>
            Upcoming Events
          </Text>

          <Text style={styles.countText}>
            {filteredEvents.length} found
          </Text>
        </View>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const isRegistered = registeredEvents.includes(
              event.id
            );

            return (
              <View
                key={event.id}
                style={styles.eventCard}
              >

                {/* Event Icon */}
                <View style={styles.eventIcon}>
                  <Ionicons
                    name={
                      event.category === "Workshop"
                        ? "phone-portrait-outline"
                        : event.category === "Hackathon"
                        ? "laptop-outline"
                        : event.category === "Placement"
                        ? "briefcase-outline"
                        : event.category === "Competition"
                        ? "trophy-outline"
                        : "school-outline"
                    }
                    size={28}
                    color="#6C63FF"
                  />
                </View>

                <View style={styles.eventContent}>

                  <View style={styles.titleRow}>
                    <Text style={styles.eventTitle}>
                      {event.title}
                    </Text>

                    {isRegistered && (
                      <View style={styles.registeredBadge}>
                        <Text style={styles.registeredBadgeText}>
                          Registered
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Category */}
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {event.category}
                    </Text>
                  </View>

                  {/* Date */}
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#777"
                    />

                    <Text style={styles.detailText}>
                      {event.date}
                    </Text>
                  </View>

                  {/* Time */}
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color="#777"
                    />

                    <Text style={styles.detailText}>
                      {event.time}
                    </Text>
                  </View>

                  {/* Location */}
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color="#777"
                    />

                    <Text style={styles.detailText}>
                      {event.location}
                    </Text>
                  </View>

                  {/* Register Button */}
                  <TouchableOpacity
                    style={[
                      styles.registerButton,
                      isRegistered &&
                        styles.unregisterButton,
                    ]}
                    onPress={() =>
                      toggleRegistration(event)
                    }
                  >
                    <Ionicons
                      name={
                        isRegistered
                          ? "checkmark-circle-outline"
                          : "add-circle-outline"
                      }
                      size={19}
                      color={
                        isRegistered
                          ? "#2E7D32"
                          : "#FFFFFF"
                      }
                    />

                    <Text
                      style={[
                        styles.registerButtonText,
                        isRegistered &&
                          styles.unregisterButtonText,
                      ]}
                    >
                      {isRegistered
                        ? "Registered"
                        : "Register Now"}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            );
          })
        ) : (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <Ionicons
              name="calendar-clear-outline"
              size={65}
              color="#AAA"
            />

            <Text style={styles.emptyTitle}>
              No Events Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Campus Connect • Events
        </Text>

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
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerSmall: {
    color: "#E8E7FF",
    fontSize: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  calendarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  summaryContent: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  summarySubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  summaryNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  searchBox: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
    color: "#333",
  },

  categoryScroll: {
    marginTop: 14,
  },

  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 8,
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  resultText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
  },

  countText: {
    fontSize: 12,
    color: "#888",
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 3,
  },

  eventIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  eventContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  eventTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },

  registeredBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },

  registeredBadgeText: {
    fontSize: 9,
    color: "#2E7D32",
    fontWeight: "bold",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 7,
    marginBottom: 7,
  },

  categoryBadgeText: {
    fontSize: 10,
    color: "#6C63FF",
    fontWeight: "bold",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  detailText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 7,
  },

  registerButton: {
    height: 40,
    backgroundColor: "#6C63FF",
    borderRadius: 9,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 6,
  },

  unregisterButton: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },

  unregisterButtonText: {
    color: "#2E7D32",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#555",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 15,
  },
});