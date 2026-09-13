import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REMINDER_KEY = "event_reminders";

const EventReminderScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState({});

  const events = [
    {
      id: "1",
      title: "Coding Contest",
      category: "Technical",
      date: "15 September 2026",
      time: "11:00 AM",
      venue: "Computer Lab",
    },
    {
      id: "2",
      title: "Cultural Fest",
      category: "Cultural",
      date: "20 September 2026",
      time: "5:00 PM",
      venue: "College Auditorium",
    },
    {
      id: "3",
      title: "Sports Meet",
      category: "Sports",
      date: "25 September 2026",
      time: "9:00 AM",
      venue: "College Ground",
    },
  ];

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        REMINDER_KEY
      );

      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Load reminder error:", error);
    }
  };

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

  const calculateDaysLeft = (eventId) => {
    let eventDate;

    if (eventId === "1") {
      eventDate = new Date(2026, 8, 15);
    } else if (eventId === "2") {
      eventDate = new Date(2026, 8, 20);
    } else {
      eventDate = new Date(2026, 8, 25);
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const difference = eventDate - today;

    return Math.max(
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      ),
      0
    );
  };

  const getCategoryIcon = (category) => {
    if (category === "Technical") {
      return "code-slash-outline";
    }

    if (category === "Cultural") {
      return "musical-notes-outline";
    }

    return "football-outline";
  };

  const renderEvent = ({ item }) => {
    const daysLeft = calculateDaysLeft(item.id);
    const reminderActive = reminders[item.id];

    return (
      <View style={styles.eventCard}>

        {/* Top */}
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

        {/* Details */}
        <View style={styles.divider} />

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
          onPress={() => toggleReminder(item)}
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

      {/* Introduction */}
      <View style={styles.introCard}>

        <View style={styles.introIcon}>
          <Ionicons
            name="alarm-outline"
            size={28}
            color="#6C63FF"
          />
        </View>

        <View style={styles.introContent}>
          <Text style={styles.introTitle}>
            Never Miss an Event
          </Text>

          <Text style={styles.introText}>
            Set reminders for upcoming campus
            events and stay updated.
          </Text>
        </View>

      </View>

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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

  introCard: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  introIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  introContent: {
    flex: 1,
    marginLeft: 12,
  },

  introTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  introText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    lineHeight: 17,
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 25,
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
});