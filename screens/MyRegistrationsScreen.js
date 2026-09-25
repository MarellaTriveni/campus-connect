import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const STORAGE_KEY = "my_registrations";

const categories = [
  "All",
  "Technical",
  "Workshop",
  "Cultural",
  "Sports",
];

export default function MyRegistrationsScreen({ navigation }) {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedRegistration, setSelectedRegistration] =
    useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  // Load registrations
  const loadRegistrations = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        setRegistrations(JSON.parse(stored));
      } else {
        setRegistrations([]);
      }
    } catch (error) {
      console.log("Error loading registrations:", error);
    }
  };

  // Reload whenever screen opens
  useFocusEffect(
    useCallback(() => {
      loadRegistrations();
    }, [])
  );

  // Cancel registration
  const cancelRegistration = (id) => {
    Alert.alert(
      "Cancel Registration",
      "Are you sure you want to cancel this registration?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              const updated = registrations.filter(
                (item) => item.id !== id
              );

              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
              );

              setRegistrations(updated);

              setModalVisible(false);

              Alert.alert(
                "Registration Cancelled",
                "Your registration has been cancelled successfully."
              );
            } catch (error) {
              console.log("Cancel error:", error);
            }
          },
        },
      ]
    );
  };

  // Open registration details
  const openDetails = (item) => {
    setSelectedRegistration(item);
    setModalVisible(true);
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.eventName?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.venue?.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Registration card
  const renderRegistration = ({ item }) => (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Ionicons
            name="calendar"
            size={24}
            color="#2563EB"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.eventName}>
            {item.eventName}
          </Text>

          <Text style={styles.category}>
            {item.category || "General"}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            REGISTERED
          </Text>
        </View>
      </View>

      {/* Date */}
      <View style={styles.infoRow}>
        <Ionicons
          name="calendar-outline"
          size={18}
          color="#555"
        />

        <Text style={styles.infoText}>
          {item.date}
        </Text>
      </View>

      {/* Time */}
      <View style={styles.infoRow}>
        <Ionicons
          name="time-outline"
          size={18}
          color="#555"
        />

        <Text style={styles.infoText}>
          {item.time}
        </Text>
      </View>

      {/* Venue */}
      <View style={styles.infoRow}>
        <Ionicons
          name="location-outline"
          size={18}
          color="#555"
        />

        <Text style={styles.infoText}>
          {item.venue}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Registration ID */}
      <Text style={styles.registrationId}>
        Registration ID: {item.id}
      </Text>

      {/* Buttons */}
      <View style={styles.buttons}>
        {/* View Details */}
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => openDetails(item)}
        >
          <Ionicons
            name="eye-outline"
            size={18}
            color="#2563EB"
          />

          <Text style={styles.detailsText}>
            View Details
          </Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelRegistration(item.id)}
        >
          <Ionicons
            name="close-circle-outline"
            size={18}
            color="#DC2626"
          />

          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* DAY 46 - Feedback Button */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() =>
          navigation.navigate("EventFeedback", {
            event: item,
          })
        }
      >
        <Ionicons
          name="star-outline"
          size={19}
          color="#D97706"
        />

        <Text style={styles.feedbackText}>
          Give Event Feedback
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Registrations
        </Text>

        <Ionicons
          name="ticket-outline"
          size={25}
          color="#fff"
        />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryTitle}>
            Total Registrations
          </Text>

          <Text style={styles.summaryCount}>
            {registrations.length}
          </Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons
            name="checkmark-circle"
            size={42}
            color="#16A34A"
          />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="Search registrations..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
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
                styles.categoryButtonActive,
            ]}
            onPress={() =>
              setSelectedCategory(item)
            }
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === item &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Registration List */}
      {filteredRegistrations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-text-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            No Registrations Found
          </Text>

          <Text style={styles.emptyText}>
            Register for an event to see your
            registrations here.
          </Text>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <Text style={styles.browseText}>
              Browse Events
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredRegistrations}
          keyExtractor={(item) =>
            String(item.id)
          }
          renderItem={renderRegistration}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Registration Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Registration Details
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={26}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            {selectedRegistration && (
              <>
                {/* Icon */}
                <View style={styles.modalIcon}>
                  <Ionicons
                    name="ticket"
                    size={35}
                    color="#2563EB"
                  />
                </View>

                {/* Event Name */}
                <Text style={styles.modalEventName}>
                  {selectedRegistration.eventName}
                </Text>

                {/* Registration ID */}
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>
                    Registration ID
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedRegistration.id}
                  </Text>
                </View>

                {/* Category */}
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>
                    Category
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedRegistration.category}
                  </Text>
                </View>

                {/* Date & Time */}
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>
                    Date & Time
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedRegistration.date} •{" "}
                    {selectedRegistration.time}
                  </Text>
                </View>

                {/* Venue */}
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>
                    Venue
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedRegistration.venue}
                  </Text>
                </View>

                {/* Registration Date */}
                {selectedRegistration.registrationDate && (
                  <View style={styles.detailBox}>
                    <Text style={styles.detailLabel}>
                      Registered On
                    </Text>

                    <Text style={styles.detailValue}>
                      {
                        selectedRegistration.registrationDate
                      }
                    </Text>
                  </View>
                )}

                {/* Confirmed */}
                <View style={styles.confirmedBox}>
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#16A34A"
                  />

                  <Text style={styles.confirmedText}>
                    Registration Confirmed
                  </Text>
                </View>

                {/* Feedback from Modal */}
                <TouchableOpacity
                  style={styles.modalFeedbackButton}
                  onPress={() => {
                    setModalVisible(false);

                    navigation.navigate(
                      "EventFeedback",
                      {
                        event: selectedRegistration,
                      }
                    );
                  }}
                >
                  <Ionicons
                    name="star-outline"
                    size={20}
                    color="#D97706"
                  />

                  <Text
                    style={styles.modalFeedbackText}
                  >
                    Give Event Feedback
                  </Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() =>
                    cancelRegistration(
                      selectedRegistration.id
                    )
                  }
                >
                  <Text style={styles.modalCancelText}>
                    Cancel Registration
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 45,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  summaryCard: {
    margin: 15,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 14,
    color: "#64748B",
  },

  summaryCount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 4,
  },

  summaryIcon: {
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 50,
  },

  searchBox: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: "#1E293B",
  },

  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 8,
  },

  categoryButtonActive: {
    backgroundColor: "#2563EB",
  },

  categoryButtonText: {
    color: "#475569",
    fontWeight: "600",
  },

  categoryButtonTextActive: {
    color: "#fff",
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  titleContainer: {
    flex: 1,
  },

  eventName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  category: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    color: "#15803D",
    fontSize: 9,
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  infoText: {
    marginLeft: 8,
    color: "#475569",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 13,
  },

  registrationId: {
    fontSize: 12,
    color: "#64748B",
  },

  buttons: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },

  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  detailsText: {
    color: "#2563EB",
    fontWeight: "bold",
    marginLeft: 5,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  cancelText: {
    color: "#DC2626",
    fontWeight: "bold",
    marginLeft: 5,
  },

  /* DAY 46 FEEDBACK BUTTON */
  feedbackButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
  },

  feedbackText: {
    color: "#D97706",
    fontWeight: "bold",
    marginLeft: 5,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#334155",
    marginTop: 15,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 8,
    lineHeight: 21,
  },

  browseButton: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  browseText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 30,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E293B",
  },

  modalIcon: {
    alignSelf: "center",
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 50,
    marginTop: 18,
  },

  modalEventName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginVertical: 15,
  },

  detailBox: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  detailLabel: {
    color: "#64748B",
    fontSize: 12,
  },

  detailValue: {
    color: "#1E293B",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  confirmedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },

  confirmedText: {
    color: "#15803D",
    fontWeight: "bold",
    marginLeft: 8,
  },

  /* MODAL FEEDBACK */

  modalFeedbackButton: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FCD34D",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 12,
  },

  modalFeedbackText: {
    color: "#D97706",
    fontWeight: "bold",
    marginLeft: 7,
  },

  modalCancelButton: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  modalCancelText: {
    color: "#DC2626",
    fontWeight: "bold",
  },
});