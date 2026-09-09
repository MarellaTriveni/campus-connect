import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const STORAGE_KEY = "my_registrations";

const EventScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [registeredIds, setRegisteredIds] = useState([]);
  const [message, setMessage] = useState("");

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

  // Load registered events whenever Events screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadRegistrations();
    }, [])
  );

  const loadRegistrations = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        const registrations = JSON.parse(data);

        const ids = registrations
          .filter((item) => item.status !== "Cancelled")
          .map((item) => item.id);

        setRegisteredIds(ids);
      } else {
        setRegisteredIds([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const registerForEvent = async (event) => {
    try {
      const existingData =
        await AsyncStorage.getItem(STORAGE_KEY);

      const registrations = existingData
        ? JSON.parse(existingData)
        : [];

      const alreadyRegistered = registrations.some(
        (item) =>
          item.id === event.id &&
          item.status !== "Cancelled"
      );

      if (alreadyRegistered) {
        setMessage("You are already registered.");
        return;
      }

      const registrationId =
        "REG-" +
        new Date().getFullYear() +
        "-" +
        String(registrations.length + 1).padStart(3, "0");

      const newRegistration = {
        ...event,
        registrationId,
        status: "Registered",
        registeredAt: new Date().toLocaleDateString(),
      };

      const updatedRegistrations = [
        ...registrations,
        newRegistration,
      ];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRegistrations)
      );

      setRegisteredIds((prev) => [...prev, event.id]);

      setMessage("Registration successful!");
    } catch (error) {
      console.log(error);
      setMessage("Unable to register for the event.");
    }
  };

  const showEventDetails = (event) => {
    setSelectedEvent(event);
    setMessage("");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
    setMessage("");
  };

  const renderEvent = ({ item }) => {
    const isRegistered = registeredIds.includes(item.id);

    return (
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
          <View style={styles.titleRow}>
            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            {isRegistered && (
              <View style={styles.registeredBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color="#249653"
                />

                <Text style={styles.registeredText}>
                  Registered
                </Text>
              </View>
            )}
          </View>

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
  };

  const selectedIsRegistered =
    selectedEvent &&
    registeredIds.includes(selectedEvent.id);

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

      {/* EVENTS */}
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

      {/* EVENT DETAILS MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Event Details
              </Text>

              <TouchableOpacity onPress={closeModal}>
                <Ionicons
                  name="close"
                  size={26}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {selectedEvent && (
              <>
                <View style={styles.modalIcon}>
                  <Ionicons
                    name="calendar"
                    size={42}
                    color="#6C63FF"
                  />
                </View>

                <Text style={styles.detailTitle}>
                  {selectedEvent.title}
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {selectedEvent.category}
                  </Text>
                </View>

                {selectedIsRegistered && (
                  <View style={styles.modalRegistered}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#249653"
                    />

                    <Text style={styles.modalRegisteredText}>
                      Already Registered
                    </Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.detailLabel}>
                      Date
                    </Text>

                    <Text style={styles.detailValue}>
                      {selectedEvent.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="time-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.detailLabel}>
                      Time
                    </Text>

                    <Text style={styles.detailValue}>
                      {selectedEvent.time}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.detailLabel}>
                      Venue
                    </Text>

                    <Text style={styles.detailValue}>
                      {selectedEvent.venue}
                    </Text>
                  </View>
                </View>

                <Text style={styles.descriptionLabel}>
                  Description
                </Text>

                <Text style={styles.description}>
                  {selectedEvent.description}
                </Text>

                {message !== "" && (
                  <View style={styles.messageBox}>
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#249653"
                    />

                    <Text style={styles.messageText}>
                      {message}
                    </Text>
                  </View>
                )}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeButtonText}>
                      Close
                    </Text>
                  </TouchableOpacity>

                  {!selectedIsRegistered ? (
                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() =>
                        registerForEvent(selectedEvent)
                      }
                    >
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color="white"
                      />

                      <Text style={styles.registerButtonText}>
                        Register
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.alreadyButton}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#249653"
                      />

                      <Text style={styles.alreadyButtonText}>
                        Registered
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  registeredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
    marginBottom: 5,
  },

  registeredText: {
    color: "#249653",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 3,
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

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 22,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
  },

  modalIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },

  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  badge: {
    alignSelf: "center",
    backgroundColor: "#EEEEFF",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 8,
  },

  badgeText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },

  modalRegistered: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    padding: 9,
    borderRadius: 10,
    marginBottom: 10,
  },

  modalRegisteredText: {
    color: "#249653",
    fontWeight: "bold",
    marginLeft: 6,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  detailLabel: {
    fontSize: 12,
    color: "#888",
    marginLeft: 12,
  },

  detailValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    marginLeft: 12,
  },

  descriptionLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },

  description: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },

  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },

  messageText: {
    color: "#249653",
    marginLeft: 8,
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  closeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },

  registerButton: {
    flex: 1,
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  alreadyButton: {
    flex: 1,
    backgroundColor: "#EAF8EF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  alreadyButtonText: {
    color: "#249653",
    fontWeight: "bold",
  },
});