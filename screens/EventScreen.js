import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "my_registrations";

const EventScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [registrations, setRegistrations] = useState([]);

  const categories = [
    "All",
    "Workshop",
    "Technical",
    "Cultural",
    "Sports",
  ];

  const events = [
    {
      id: "1",
      title: "React Native Workshop",
      category: "Workshop",
      date: "10 September 2026",
      time: "10:00 AM",
      venue: "Seminar Hall",
      seats: 40,
      description:
        "Learn React Native and build mobile applications.",
    },
    {
      id: "2",
      title: "Coding Contest",
      category: "Technical",
      date: "15 September 2026",
      time: "11:00 AM",
      venue: "Computer Lab",
      seats: 30,
      description:
        "Participate in a coding contest and improve your programming skills.",
    },
    {
      id: "3",
      title: "Cultural Fest",
      category: "Cultural",
      date: "20 September 2026",
      time: "5:00 PM",
      venue: "College Auditorium",
      seats: 100,
      description:
        "Enjoy music, dance and cultural activities.",
    },
    {
      id: "4",
      title: "Inter College Sports Meet",
      category: "Sports",
      date: "25 September 2026",
      time: "9:00 AM",
      venue: "College Ground",
      seats: 50,
      description:
        "Participate in different sports competitions.",
    },
  ];

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
      console.log(error);
    }
  };

  const isRegistered = (eventId) => {
    return registrations.some(
      (item) =>
        item.id === eventId &&
        item.status !== "Cancelled"
    );
  };

  const getAvailableSeats = (event) => {
    const registeredCount = registrations.filter(
      (item) =>
        item.id === event.id &&
        item.status !== "Cancelled"
    ).length;

    return Math.max(event.seats - registeredCount, 0);
  };

  const registerForEvent = async (event) => {
    try {
      const existingData =
        await AsyncStorage.getItem(STORAGE_KEY);

      const currentRegistrations = existingData
        ? JSON.parse(existingData)
        : [];

      const alreadyRegistered =
        currentRegistrations.some(
          (item) =>
            item.id === event.id &&
            item.status !== "Cancelled"
        );

      if (alreadyRegistered) {
        Alert.alert(
          "Already Registered",
          "You are already registered for this event."
        );
        return;
      }

      const availableSeats = Math.max(
        event.seats -
          currentRegistrations.filter(
            (item) =>
              item.id === event.id &&
              item.status !== "Cancelled"
          ).length,
        0
      );

      if (availableSeats === 0) {
        Alert.alert(
          "Registration Closed",
          "No seats are available for this event."
        );
        return;
      }

      const registrationId =
        `REG${String(
          currentRegistrations.length + 1
        ).padStart(3, "0")}`;

      const newRegistration = {
        ...event,
        registrationId,
        status: "Registered",
      };

      const updatedRegistrations = [
        ...currentRegistrations,
        newRegistration,
      ];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRegistrations)
      );

      setRegistrations(updatedRegistrations);

      Alert.alert(
        "Registration Successful",
        `You are registered for ${event.title}.\n\nRegistration ID: ${registrationId}`
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to register for the event."
      );
    }
  };

  const showEventDetails = (event) => {
    const availableSeats = getAvailableSeats(event);
    const registered = isRegistered(event.id);

    Alert.alert(
      event.title,
      `Category: ${event.category}

Date: ${event.date}
Time: ${event.time}
Venue: ${event.venue}

Seats Available: ${availableSeats}

${event.description}`,
      [
        registered
          ? {
              text: "Already Registered",
              style: "cancel",
            }
          : availableSeats > 0
          ? {
              text: "Register",
              onPress: () =>
                registerForEvent(event),
            }
          : {
              text: "Registration Closed",
              style: "cancel",
            },
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderEvent = ({ item }) => {
    const availableSeats = getAvailableSeats(item);
    const registered = isRegistered(item.id);
    const isFull = availableSeats === 0;

    return (
      <View style={styles.eventCard}>

        {/* TOP */}
        <View style={styles.eventTop}>

          <View style={styles.iconBox}>
            <Ionicons
              name="calendar-outline"
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            <Text style={styles.category}>
              {item.category}
            </Text>
          </View>

        </View>

        {/* EVENT INFO */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={17}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={17}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={17}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.venue}
          </Text>
        </View>

        {/* STATUS */}
        <View
          style={[
            styles.statusBox,
            isFull && styles.closedStatusBox,
          ]}
        >
          <Ionicons
            name={
              isFull
                ? "close-circle"
                : "checkmark-circle"
            }
            size={19}
            color={
              isFull
                ? "#D64545"
                : "#249653"
            }
          />

          <Text
            style={[
              styles.statusText,
              isFull && styles.closedStatusText,
            ]}
          >
            {isFull
              ? "Registration Closed"
              : "Open for Registration"}
          </Text>

          {!isFull && (
            <Text style={styles.seatsText}>
              {availableSeats} Seats Available
            </Text>
          )}
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              showEventDetails(item)
            }
          >
            <Ionicons
              name="eye-outline"
              size={18}
              color="#6C63FF"
            />

            <Text style={styles.detailsText}>
              View Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.registerButton,
              registered &&
                styles.registeredButton,
              isFull &&
                styles.closedButton,
            ]}
            disabled={registered || isFull}
            onPress={() =>
              registerForEvent(item)
            }
          >
            <Ionicons
              name={
                registered
                  ? "checkmark-circle"
                  : isFull
                  ? "close-circle"
                  : "person-add-outline"
              }
              size={18}
              color="white"
            />

            <Text style={styles.registerButtonText}>
              {registered
                ? "Registered"
                : isFull
                ? "Closed"
                : "Register Now"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Events
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "MyRegistrations"
            )
          }
        >
          <View style={styles.headerIcon}>
            <Ionicons
              name="clipboard-outline"
              size={23}
              color="#6C63FF"
            />

            <Text style={styles.headerCount}>
              {registrations.filter(
                (item) =>
                  item.status !== "Cancelled"
              ).length}
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* SEARCH */}
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

        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch("")}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* CATEGORIES */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={
          styles.categoryList
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item &&
                styles.selectedCategory,
            ]}
            onPress={() =>
              setSelectedCategory(item)
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item &&
                  styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* EVENT LIST */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={
          styles.eventList
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons
              name="calendar-outline"
              size={60}
              color="#aaa"
            />

            <Text style={styles.emptyText}>
              No events found
            </Text>
          </View>
        }
      />

    </View>
  );
};

export default EventScreen;

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
    fontSize: 21,
    fontWeight: "bold",
  },

  headerIcon: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  headerCount: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 4,
  },

  searchBox: {
    backgroundColor: "white",
    margin: 15,
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
    paddingBottom: 10,
  },

  categoryButton: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    color: "#555",
    fontWeight: "500",
  },

  selectedCategoryText: {
    color: "white",
  },

  eventList: {
    padding: 15,
    paddingBottom: 30,
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    elevation: 2,
  },

  eventTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  eventContent: {
    flex: 1,
    marginLeft: 12,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  infoText: {
    marginLeft: 7,
    color: "#555",
    fontSize: 13,
  },

  statusBox: {
    marginTop: 13,
    backgroundColor: "#EAF8EF",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  closedStatusBox: {
    backgroundColor: "#FDECEC",
  },

  statusText: {
    color: "#249653",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 6,
  },

  closedStatusText: {
    color: "#D64545",
  },

  seatsText: {
    marginLeft: "auto",
    color: "#555",
    fontSize: 12,
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  detailsText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 13,
  },

  registerButton: {
    flex: 1,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  registeredButton: {
    backgroundColor: "#249653",
  },

  closedButton: {
    backgroundColor: "#999",
  },

  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 13,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: "#777",
    fontSize: 16,
  },
});