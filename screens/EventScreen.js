import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EventScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    "All",
    "College Event",
    "Competition",
    "Workshop",
    "Hackathon",
  ];

  const events = [
    {
      title: "Technical Fest",
      category: "College Event",
      date: "15 AUG",
      time: "10:00 AM",
      venue: "College Auditorium",
      description:
        "A technical fest with various activities and competitions for students.",
      icon: "school-outline",
    },
    {
      title: "Coding Contest",
      category: "Competition",
      date: "20 AUG",
      time: "11:00 AM",
      venue: "Computer Lab",
      description:
        "Participate in the coding contest and test your programming skills.",
      icon: "code-slash-outline",
    },
    {
      title: "React Native Workshop",
      category: "Workshop",
      date: "25 AUG",
      time: "2:00 PM",
      venue: "Seminar Hall",
      description:
        "Learn the basics of building mobile applications using React Native.",
      icon: "phone-portrait-outline",
    },
    {
      title: "Hackathon 2026",
      category: "Hackathon",
      date: "30 AUG",
      time: "9:00 AM",
      venue: "Innovation Center",
      description:
        "Build innovative solutions and participate in the college hackathon.",
      icon: "trophy-outline",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            Campus Activities
          </Text>

          <Text style={styles.title}>
            Events 📅
          </Text>
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

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <Text style={styles.filterTitle}>
        Categories
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

      {/* Section Header */}
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
              onPress={() => setSelectedEvent(event)}
            >
              {/* Date */}
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>
                  {event.date.split(" ")[0]}
                </Text>

                <Text style={styles.monthText}>
                  {event.date.split(" ")[1]}
                </Text>
              </View>

              {/* Content */}
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>
                  {event.title}
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {event.category}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="time-outline"
                    size={15}
                    color="#777"
                  />

                  <Text style={styles.infoText}>
                    {event.time}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="location-outline"
                    size={15}
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
              Try another search or category.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={selectedEvent !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>

            {/* Close */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Ionicons
                name="close"
                size={24}
                color="#555"
              />
            </TouchableOpacity>

            {/* Icon */}
            <View style={styles.modalIcon}>
              <Ionicons
                name={
                  selectedEvent?.icon || "calendar-outline"
                }
                size={40}
                color="#6C5B9B"
              />
            </View>

            <Text style={styles.modalTitle}>
              {selectedEvent?.title}
            </Text>

            <Text style={styles.modalCategory}>
              {selectedEvent?.category}
            </Text>

            {/* Date */}
            <View style={styles.modalInfoRow}>
              <View style={styles.modalInfoIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#6C5B9B"
                />
              </View>

              <View>
                <Text style={styles.modalLabel}>
                  Date
                </Text>

                <Text style={styles.modalValue}>
                  {selectedEvent?.date}
                </Text>
              </View>
            </View>

            {/* Time */}
            <View style={styles.modalInfoRow}>
              <View style={styles.modalInfoIcon}>
                <Ionicons
                  name="time-outline"
                  size={22}
                  color="#6C5B9B"
                />
              </View>

              <View>
                <Text style={styles.modalLabel}>
                  Time
                </Text>

                <Text style={styles.modalValue}>
                  {selectedEvent?.time}
                </Text>
              </View>
            </View>

            {/* Venue */}
            <View style={styles.modalInfoRow}>
              <View style={styles.modalInfoIcon}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#6C5B9B"
                />
              </View>

              <View>
                <Text style={styles.modalLabel}>
                  Venue
                </Text>

                <Text style={styles.modalValue}>
                  {selectedEvent?.venue}
                </Text>
              </View>
            </View>

            <Text style={styles.descriptionTitle}>
              About Event
            </Text>

            <Text style={styles.description}>
              {selectedEvent?.description}
            </Text>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.doneText}>
                Close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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
    marginBottom: 18,
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
    marginBottom: 15,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },

  categoryScroll: {
    marginBottom: 18,
  },

  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2DDEF",
  },

  selectedCategory: {
    backgroundColor: "#6C5B9B",
    borderColor: "#6C5B9B",
  },

  categoryText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
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
    height: 62,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  dateText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B3F72",
  },

  monthText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6C5B9B",
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  badge: {
    backgroundColor: "#EEEAF8",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 5,
  },

  badgeText: {
    fontSize: 9,
    color: "#6C5B9B",
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 6,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 70,
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

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },

  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },

  modalIcon: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 15,
  },

  modalCategory: {
    fontSize: 13,
    color: "#6C5B9B",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 20,
  },

  modalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  modalInfoIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  modalLabel: {
    fontSize: 12,
    color: "#888",
  },

  modalValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginTop: 2,
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  description: {
    fontSize: 13,
    color: "#777",
    lineHeight: 19,
    marginTop: 5,
  },

  doneButton: {
    backgroundColor: "#6C5B9B",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  doneText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});