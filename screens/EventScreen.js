import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const STORAGE_KEY = "my_registrations";

const eventsData = [
  {
    id: "1",
    title: "Coding Contest",
    category: "Technical",
    date: "15 September 2026",
    time: "11:00 AM",
    venue: "Computer Lab",
    description:
      "Participate in the coding contest and test your programming skills.",
    seats: 50,
  },
  {
    id: "2",
    title: "Cultural Fest",
    category: "Cultural",
    date: "20 September 2026",
    time: "10:00 AM",
    venue: "College Auditorium",
    description:
      "Enjoy music, dance and other cultural activities.",
    seats: 100,
  },
  {
    id: "3",
    title: "Sports Meet",
    category: "Sports",
    date: "25 September 2026",
    time: "9:00 AM",
    venue: "College Ground",
    description:
      "Students can participate in different sports activities.",
    seats: 80,
  },
  {
    id: "4",
    title: "React Native Workshop",
    category: "Workshop",
    date: "28 September 2026",
    time: "2:00 PM",
    venue: "Seminar Hall",
    description:
      "Learn the basics of React Native and mobile application development.",
    seats: 40,
  },
  {
    id: "5",
    title: "AI and Machine Learning Seminar",
    category: "Technical",
    date: "30 September 2026",
    time: "11:00 AM",
    venue: "Block A Seminar Hall",
    description:
      "Introduction to Artificial Intelligence and Machine Learning concepts.",
    seats: 70,
  },
];

const categories = [
  "All",
  "Technical",
  "Workshop",
  "Cultural",
  "Sports",
];

export default function EventScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setRegistrations(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error loading registrations:", error);
    }
  };

  const isRegistered = (eventId) => {
    return registrations.some(
      (item) => item.eventId === eventId
    );
  };

  const registerEvent = async (event) => {
    try {
      if (isRegistered(event.id)) {
        Alert.alert(
          "Already Registered",
          "You are already registered for this event."
        );
        return;
      }

      const registration = {
        id: Date.now().toString(),
        eventId: event.id,
        eventName: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        venue: event.venue,
        registrationDate: new Date().toLocaleDateString(),
      };

      const updated = [...registrations, registration];

      setRegistrations(updated);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      Alert.alert(
        "Registration Successful",
        `You are registered for ${event.title}.`
      );
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  const filteredEvents = eventsData.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderEvent = ({ item }) => {
    const registered = isRegistered(item.id);

    return (
      <View style={styles.eventCard}>

        {/* Event Header */}
        <View style={styles.topRow}>
          <View style={styles.eventIcon}>
            <Ionicons
              name="calendar-outline"
              size={27}
              color="#2563EB"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>

        {/* Event Information */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#2563EB"
          />

          <Text style={styles.infoText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={20}
            color="#2563EB"
          />

          <Text style={styles.infoText}>
            {item.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#2563EB"
          />

          <Text style={styles.infoText}>
            {item.venue}
          </Text>
        </View>

        {/* Seats */}
        <View style={styles.seatRow}>
          <Ionicons
            name="people-outline"
            size={20}
            color="#555"
          />

          <Text style={styles.seatText}>
            {item.seats} seats available
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* Registration Status */}
        {registered && (
          <View style={styles.registeredBox}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#16A34A"
            />

            <Text style={styles.registeredText}>
              You are registered
            </Text>
          </View>
        )}

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            registered && styles.registeredButton,
          ]}
          onPress={() => registerEvent(item)}
        >
          <Ionicons
            name={
              registered
                ? "checkmark-circle-outline"
                : "person-add-outline"
            }
            size={20}
            color="#fff"
          />

          <Text style={styles.registerButtonText}>
            {registered
              ? "Registered"
              : "Register Now"}
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
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Events
          </Text>

          <Text style={styles.headerSubtitle}>
            Discover college events
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyRegistrations")
          }
        >
          <Ionicons
            name="ticket-outline"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>
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
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === item &&
                styles.activeFilter,
            ]}
            onPress={() =>
              setSelectedCategory(item)
            }
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === item &&
                  styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Result Count */}
      <Text style={styles.resultText}>
        {filteredEvents.length} event
        {filteredEvents.length !== 1 ? "s" : ""} found
      </Text>

      {/* Events */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="calendar-outline"
            size={70}
            color="#aaa"
          />

          <Text style={styles.emptyTitle}>
            No Events Found
          </Text>

          <Text style={styles.emptyText}>
            Try another search or category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerCenter: {
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#DCE7FF",
    fontSize: 13,
    marginTop: 3,
  },

  searchBox: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 8,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: "#555",
    fontSize: 14,
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultText: {
    marginHorizontal: 18,
    marginBottom: 8,
    color: "#666",
    fontSize: 14,
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  eventIcon: {
    width: 52,
    height: 52,
    borderRadius: 13,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 6,
  },

  categoryText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  infoText: {
    marginLeft: 9,
    color: "#555",
    fontSize: 14,
  },

  seatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  seatText: {
    marginLeft: 9,
    color: "#555",
    fontSize: 13,
  },

  description: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },

  registeredBox: {
    backgroundColor: "#E8F7EE",
    borderRadius: 9,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  registeredText: {
    color: "#16A34A",
    fontWeight: "bold",
    marginLeft: 7,
    fontSize: 13,
  },

  registerButton: {
    height: 48,
    backgroundColor: "#2563EB",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 14,
  },

  registeredButton: {
    backgroundColor: "#16A34A",
  },

  registerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 7,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#444",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    marginTop: 7,
  },
});