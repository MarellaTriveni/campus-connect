import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REMINDER_KEY = "event_reminders";

const EventReminderScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const events = [
    {
      id: "1",
      title: "Coding Contest",
      category: "Technical",
      date: "15 September 2026",
      time: "11:00 AM",
      venue: "Computer Lab",
      eventDate: new Date(2026, 8, 15),
    },
    {
      id: "2",
      title: "Cultural Fest",
      category: "Cultural",
      date: "20 September 2026",
      time: "5:00 PM",
      venue: "College Auditorium",
      eventDate: new Date(2026, 8, 20),
    },
    {
      id: "3",
      title: "Sports Meet",
      category: "Sports",
      date: "25 September 2026",
      time: "9:00 AM",
      venue: "College Ground",
      eventDate: new Date(2026, 8, 25),
    },
  ];

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Sports",
  ];

  useEffect(() => {
    loadReminders();
  }, []);

  // Load saved reminders
  const loadReminders = async () => {
    try {
      const saved = await AsyncStorage.getItem(REMINDER_KEY);

      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Load reminder error:", error);
    }
  };

  // Add or remove reminder
  const toggleReminder = async (event) => {
    try {
      const updatedReminders = {
        ...reminders,
        [event.id]: !reminders[event.id],
      };

      setReminders(updatedReminders);

      await AsyncStorage.setItem(
        REMINDER_KEY,
        JSON.stringify(updatedReminders)
      );

      if (updatedReminders[event.id]) {
        Alert.alert(
          "Reminder Added",
          `Reminder set for ${event.title}.`
        );
      } else {
        Alert.alert(
          "Reminder Removed",
          `Reminder removed for ${event.title}.`
        );
      }
    } catch (error) {
      console.log("Reminder error:", error);

      Alert.alert(
        "Error",
        "Unable to update reminder."
      );
    }
  };

  // Calculate days remaining
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const date = new Date(eventDate);
    date.setHours(0, 0, 0, 0);

    const difference = date - today;

    return Math.max(
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      ),
      0
    );
  };

  // Active reminder count
  const getActiveReminderCount = () => {
    return Object.values(reminders).filter(
      (value) => value === true
    ).length;
  };

  // Category icon
  const getCategoryIcon = (category) => {
    if (category === "Technical") {
      return "code-slash-outline";
    }

    if (category === "Cultural") {
      return "musical-notes-outline";
    }

    return "football-outline";
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      event.category
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      event.venue
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Event card
  const renderEvent = ({ item }) => {
    const daysLeft = calculateDaysLeft(
      item.eventDate
    );

    const reminderActive =
      reminders[item.id] === true;

    return (
      <View style={styles.eventCard}>

        {/* Event Top */}
        <View style={styles.eventTop}>

          <View style={styles.iconBox}>
            <Ionicons
              name={getCategoryIcon(item.category)}
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.eventInfo}>

            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

          </View>

          <View style={styles.daysBox}>

            <Text style={styles.daysNumber}>
              {daysLeft}
            </Text>

            <Text style={styles.daysLabel}>
              DAYS
            </Text>

          </View>

        </View>

        <View style={styles.divider} />

        {/* Date */}
        <View style={styles.detailRow}>

          <Ionicons
            name="calendar-outline"
            size={18}
            color="#777"
          />

          <Text style={styles.detailText}>
            {item.date}
          </Text>

        </View>

        {/* Time */}
        <View style={styles.detailRow}>

          <Ionicons
            name="time-outline"
            size={18}
            color="#777"
          />

          <Text style={styles.detailText}>
            {item.time}
          </Text>

        </View>

        {/* Venue */}
        <View style={styles.detailRow}>

          <Ionicons
            name="location-outline"
            size={18}
            color="#777"
          />

          <Text style={styles.detailText}>
            {item.venue}
          </Text>

        </View>

        {/* Reminder */}
        <TouchableOpacity
          style={[
            styles.reminderButton,
            reminderActive &&
              styles.reminderActive,
          ]}
          onPress={() =>
            toggleReminder(item)
          }
        >

          <Ionicons
            name={
              reminderActive
                ? "notifications"
                : "notifications-outline"
            }
            size={19}
            color={
              reminderActive
                ? "white"
                : "#6C63FF"
            }
          />

          <Text
            style={[
              styles.reminderText,
              reminderActive &&
                styles.reminderActiveText,
            ]}
          >
            {reminderActive
              ? "Reminder Set"
              : "Set Reminder"}
          </Text>

        </TouchableOpacity>

      </View>
    );
  };

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
          Event Reminders
        </Text>

        <View style={{ width: 26 }} />

      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}

        ListHeaderComponent={
          <>

            {/* Summary */}
            <View style={styles.summaryCard}>

              <View style={styles.summaryIcon}>
                <Ionicons
                  name="notifications"
                  size={28}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.summaryContent}>

                <Text style={styles.summaryTitle}>
                  Your Reminders
                </Text>

                <Text style={styles.summaryText}>
                  {getActiveReminderCount()} active reminder
                  {getActiveReminderCount() !== 1
                    ? "s"
                    : ""}
                </Text>

              </View>

              <View style={styles.countCircle}>

                <Text style={styles.countText}>
                  {getActiveReminderCount()}
                </Text>

              </View>

            </View>

            {/* Search */}
            <View style={styles.searchContainer}>

              <Ionicons
                name="search-outline"
                size={20}
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
                  onPress={() =>
                    setSearchText("")
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              )}

            </View>

            {/* Category Filter */}
            <Text style={styles.filterTitle}>
              Categories
            </Text>

            <View style={styles.categoryContainer}>

              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.categorySelected,
                  ]}
                  onPress={() =>
                    setSelectedCategory(category)
                  }
                >

                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category &&
                        styles.categorySelectedText,
                    ]}
                  >
                    {category}
                  </Text>

                </TouchableOpacity>
              ))}

            </View>

            {/* Results */}
            <View style={styles.resultsRow}>

              <Text style={styles.resultsText}>
                {filteredEvents.length} event
                {filteredEvents.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </Text>

            </View>

          </>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Ionicons
              name="calendar-outline"
              size={55}
              color="#BBBBBB"
            />

            <Text style={styles.emptyTitle}>
              No Events Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>

          </View>
        }
      />

    </View>
  );
};

export default EventReminderScreen;

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

  list: {
    padding: 15,
    paddingBottom: 30,
  },

  summaryCard: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 12,
  },

  summaryIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryContent: {
    flex: 1,
    marginLeft: 12,
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  summaryText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  countCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  searchContainer: {
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 9,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 9,
  },

  categoryContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 8,
    elevation: 1,
  },

  categorySelected: {
    backgroundColor: "#6C63FF",
  },

  categoryButtonText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  categorySelectedText: {
    color: "white",
  },

  resultsRow: {
    marginBottom: 10,
  },

  resultsText: {
    fontSize: 12,
    color: "#777",
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    elevation: 2,
  },

  eventTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 53,
    height: 53,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },

  category: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
  },

  eventTitle: {
    color: "#222",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 3,
  },

  daysBox: {
    backgroundColor: "#EEEEFF",
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
  },

  daysNumber: {
    color: "#6C63FF",
    fontSize: 20,
    fontWeight: "bold",
  },

  daysLabel: {
    color: "#6C63FF",
    fontSize: 8,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 13,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  detailText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 13,
  },

  reminderButton: {
    height: 44,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 10,
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  reminderActive: {
    backgroundColor: "#6C63FF",
  },

  reminderText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 7,
  },

  reminderActiveText: {
    color: "white",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#444",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

});