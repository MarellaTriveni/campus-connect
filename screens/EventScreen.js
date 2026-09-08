import React, { useState } from "react";
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
      description:
        "Participate in different sports competitions.",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const registerForEvent = async (event) => {
    try {
      const existingData = await AsyncStorage.getItem(
        STORAGE_KEY
      );

      const registrations = existingData
        ? JSON.parse(existingData)
        : [];

      const alreadyRegistered = registrations.some(
        (item) => item.id === event.id
      );

      if (alreadyRegistered) {
        Alert.alert(
          "Already Registered",
          `You are already registered for ${event.title}.`
        );
        return;
      }

      const updatedRegistrations = [
        ...registrations,
        event,
      ];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRegistrations)
      );

      Alert.alert(
        "Registration Successful",
        `You have successfully registered for ${event.title}.`
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
    Alert.alert(
      event.title,
      `Category: ${event.category}\n\nDate: ${event.date}\nTime: ${event.time}\nVenue: ${event.venue}\n\n${event.description}`,
      [
        {
          text: "Register",
          onPress: () => registerForEvent(event),
        },
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => showEventDetails(item)}
    >
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

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#555"
          />

          <Text style={styles.infoText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#555"
          />

          <Text style={styles.infoText}>
            {item.venue}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#777"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
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
          Events
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyRegistrations")
          }
        >
          <Ionicons
            name="clipboard-outline"
            size={26}
            color="white"
          />
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
      </View>

      {/* CATEGORY */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item &&
                styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
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
        contentContainerStyle={styles.eventList}
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
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
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

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  category: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 7,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  infoText: {
    marginLeft: 6,
    color: "#555",
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